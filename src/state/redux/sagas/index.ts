import Aria from '@/utility/aria';
import { AudioUtilities } from '@/utility/audio';
import Dom from '@/utility/dom';
import PluginManager from 'classes/plugin/manager';
import config, { TextToSpeechEngine } from 'config';
import { isAction, isActionFrom } from 'immer-reducer';
import { Ids } from 'plugins/data';
import { Action } from 'redux';
import { buffers, END, eventChannel } from 'redux-saga';
import {
  all,
  call,
  debounce,
  put,
  select,
  takeEvery
} from 'redux-saga/effects';
import { ActionCreators } from 'state/redux/actions';
import { BaseReducer } from 'state/redux/reducers';
import { watchClick } from 'state/redux/sagas/on-click';
import { watchFocus } from 'state/redux/sagas/on-focus';
import { watchKeyDown } from 'state/redux/sagas/on-key-down';
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage
} from 'state/redux/sagas/state';
import { Selectors } from 'state/redux/selectors';
import { ThemeTypes } from 'theme/types';

let speechToTextAudioElement: any;

const getActionTypeFromImmer = (action: Action): string => {
  if (action && action.type && action.type.toString().startsWith('IMMER')) {
    return action.type.toString().split('#')[1];
  }
  return '';
};

/**
 * Update theme when Contrast plugin is enabled, disabled, or has a 'theme' property option change.
 *
 * @param {Action} action
 * @returns {Generator<<"PUT", PutEffectDescriptor<{type: "setTheme"; payload: FirstOrAll<ArgumentsType<InstanceType<BaseReducer>["setTheme"]>>}>> | <"SELECT", SelectEffectDescriptor>, void, unknown>}
 */
export function* updateTheme(action: Action) {
  if (
    !isAction(action, ActionCreators.enable) &&
    !isAction(action, ActionCreators.disable) &&
    !isAction(action, ActionCreators.selectPropertyOption)
  ) {
    return;
  }

  if (action.payload.id !== Ids.Contrast) {
    return;
  }

  const state = yield select();
  const selectors = new Selectors(state);
  // Get latest state version.
  const plugin = selectors.getPlugin(action.payload.id);
  const selected = selectors.getPluginPropertySelectedOption({
    plugin,
    property: 'theme'
  });

  let newTheme = ThemeTypes.Base;

  if (plugin.enabled && selected && typeof selected.value === 'string') {
    switch (selected.value) {
      case 'black-and-yellow':
        newTheme = ThemeTypes.BlackAndYellow;
        break;
      case 'dark-contrast':
        newTheme = ThemeTypes.DarkContrast;
        break;
      case 'light-contrast':
        newTheme = ThemeTypes.LightContrast;
        break;
      default:
        newTheme = ThemeTypes.Base;
    }
  }

  // Update theme
  yield put(ActionCreators.setTheme({ theme: newTheme }));
}

export function* onPluginEnable(action: Action) {
  if (!isAction(action, ActionCreators.enable)) {
    return;
  }
  // On keyboard nav enable
  if (
    action.payload.id === Ids.KeyboardNavigation ||
    action.payload.id === Ids.VirtualKeyboard
  ) {
    // Enable keyboard
    yield put(ActionCreators.enableKeyboard());
  }
}

export function* onPluginDisable(action: Action) {
  if (!isAction(action, ActionCreators.disable)) {
    return;
  }
  // On keyboard plugin disable
  if (
    action.payload.id === Ids.KeyboardNavigation ||
    action.payload.id === Ids.VirtualKeyboard
  ) {
    // Disable keyboard
    yield put(ActionCreators.disableKeyboard());
  }
  // On text-to-speech, disable any active speaker
  if (action.payload.id === Ids.TextToSpeech) {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
    }
    if (speechToTextAudioElement) {
      speechToTextAudioElement.pause();
    }
  }
}

function* synthesizeSpeech({
  text,
  engine = config.textToSpeechEngine
}: {
  text: string;
  engine?: TextToSpeechEngine;
}) {
  if (engine === TextToSpeechEngine.Browser) {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = window.speechSynthesis.getVoices()[0];
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);
  } else if (engine === TextToSpeechEngine.GoogleCloud) {
    try {
      const state = yield select();
      const audioConfig = new Selectors(state).getTextToSpeechAudioConfig();
      const voice = new Selectors(state).getActiveTextToSpeechVoice();
      console.time('Google Cloud transaction time');
      const response = yield AudioUtilities.synthesizeSpeechFromText({
        audioConfig,
        text,
        voice
      });
      console.timeEnd('Google Cloud transaction time');

      if (response && response.audioContent) {
        if (speechToTextAudioElement) {
          speechToTextAudioElement.pause();
        }

        speechToTextAudioElement = AudioUtilities.createHTMLAudioElement({
          content: response.audioContent
        });
        if (speechToTextAudioElement) {
          return speechToTextAudioElement.play();
        }
      } else {
        console.log(`No valid response returned.`);
      }
    } catch (error) {
      console.error(error);
      // Utility.throwError(error);
    }
  }
}

export function* onFocusNode(action: Action) {
  if (!isAction(action, ActionCreators.focusNode) || !action.payload.node) {
    return;
  }
  const state = yield select();
  const textToSpeechPlugin = new Selectors(state).getPlugin(Ids.TextToSpeech);
  if (textToSpeechPlugin.enabled) {
    const linkTags = ['a'];

    const selectedOption = new Selectors(state).getPluginPropertySelectedOption(
      {
        plugin: Ids.TextToSpeech,
        property: 'behavior'
      }
    );

    // Process if:
    //  No option selected
    //  'default' selected
    //  'click' selected
    //  'links' selected and focused node is among linked tags.
    if (
      !selectedOption ||
      selectedOption.value === 'default' ||
      selectedOption.value === 'click' ||
      (selectedOption.value === 'links' &&
        linkTags.includes(Dom.getElementTag({ element: action.payload.node })))
    ) {
      const text = Aria.getElementText({ element: action.payload.node });
      if (text) {
        // Perform text-to-speech if enabled
        yield synthesizeSpeech({ text });
      }
    }
  }
}

function* onSelectPropertyOption(action: Action) {
  if (!isAction(action, ActionCreators.selectPropertyOption)) {
    return;
  }
  const { id, propertyId, optionId } = action.payload;
  const state = yield select();
  const plugin = new Selectors(state).getPlugin(id);
  const property = new Selectors(state).getPluginProperty({
    plugin: id,
    property: propertyId
  });
  const option = new Selectors(state).getPluginPropertyOption({
    plugin: id,
    property: propertyId,
    option: optionId
  });

  if (property && property.enablePluginOnChange) {
    // Disable if:
    //  - selected value is undefined or empty
    //  - selected value is disableOnValue
    if (
      !option ||
      option.value === undefined ||
      option.value === '' ||
      (property.disablePluginOnValue !== undefined &&
        option.value === property.disablePluginOnValue)
    ) {
      yield put(ActionCreators.disable({ id: plugin.id }));
    } else {
      // Enable if disabled
      if (!plugin.enabled) {
        yield put(ActionCreators.enable({ id: plugin.id }));
      }
    }
  }
}

/**
 * Executes plugin tasks on state change.
 * @param action
 * @returns {Generator<never, void, unknown>}
 */
export function* watchPluginTasks(action: any) {
  if (!action || !action.payload || !action.payload.id) {
    return;
  }
  const plugin = PluginManager.getInstance().find(action.payload.id);
  if (plugin && plugin.tasks) {
    for (const task of plugin.tasks) {
      if (task.on === getActionTypeFromImmer(action)) {
        if (task.func) {
          for (const func of task.func) {
            yield func();
          }
        }
      }
    }
  }
}

/**
 * Converts stream into Redux-saga channel.
 *
 * @see https://redux-saga.js.org/docs/advanced/Channels.html
 * @param stream
 * @param {number} limit
 * @returns {any}
 */
export function toChannel(stream: any, limit: number = 5) {
  let channelEmitter: any;

  const channel: any = eventChannel((emitter: any) => {
    channelEmitter = emitter;

    function onValue(value: any) {
      return emitter(value);
    }

    const end = () => emitter(END);

    stream.onValue(onValue);
    stream.onError(end);
    stream.onEnd(end);
    return () => {
      stream.offValue(onValue);
    };
    // new messages will be buffered up to limit
    // latest excess message is added to end of list
  }, buffers.sliding(limit));

  channel.end = () => channelEmitter(END);

  return channel;
}

/**
 * Root saga collection.
 *
 * @see https://redux-saga.js.org/docs/api/
 * @returns {Generator<<"ALL", <"CALL", CallEffectDescriptor> | <"FORK", ForkEffectDescriptor>>, void, unknown>}
 */
export function* rootSagas() {
  yield all([
    // Blocking call to load state from storage
    call(loadStateFromLocalStorage),
    // Blocking call to populate speech to text voices
    call(AudioUtilities.getSpeechToTextVoices),
    takeEvery(ActionCreators.enable, onPluginEnable),
    takeEvery(ActionCreators.disable, onPluginDisable),
    takeEvery(ActionCreators.enable, updateTheme),
    takeEvery(ActionCreators.disable, updateTheme),
    takeEvery(ActionCreators.selectPropertyOption, updateTheme),
    takeEvery(ActionCreators.selectPropertyOption, onSelectPropertyOption),
    takeEvery(ActionCreators.focusNode, onFocusNode),
    takeEvery(
      // Pattern to track all actions from reducer
      (action: Action) => isActionFrom(action, BaseReducer),
      watchPluginTasks
    ),
    // Track all focus events
    call(watchClick),
    // Track all focus events
    call(watchFocus),
    // Track all keydown events
    call(watchKeyDown),
    // Save on store update, after localStorageDebounceDelay seconds of non-interaction
    debounce(
      config.localStorageDebounceDelay * 1000,
      [
        ActionCreators.increment,
        ActionCreators.disable,
        ActionCreators.enable,
        ActionCreators.decrement
      ],
      saveStateToLocalStorage
    )
  ]);
}
