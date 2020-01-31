import { Plugins } from '@/globals';
import { Ids } from 'plugins-new/data';
import { handleKeyboardNavigation } from 'plugins-new/keyboard-navigation/plugin';
import Utility from '@/utility';
import Aria from '@/utility/aria';
import { AudioUtilities } from '@/utility/audio';
import config, { TextToSpeechEngine } from 'config';
import { isAction, isActionFrom } from 'immer-reducer';
import Kefir from 'kefir';
import { Action } from 'redux';
import { buffers, END, eventChannel } from 'redux-saga';
import {
  all,
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';
import { ActionCreators } from 'state/redux/actions';
import { BaseReducer } from 'state/redux/reducers';
import { Selectors } from 'state/redux/selectors';

let speechToTextAudioElement: any;

const getActionTypeFromImmer = (action: Action): string => {
  if (action && action.type && action.type.toString().startsWith('IMMER')) {
    return action.type.toString().split('#')[1];
  }
  return '';
};

export function* onPluginEnable(action: Action) {
  if (!isAction(action, ActionCreators.enable)) {
    return;
  }
  // On keyboard nav enable
  if (action.payload.id === Ids.KeyboardNavigation) {
    // Enable keyboard
    yield put(ActionCreators.enableKeyboard());
  }
  // On text to speech enable
  if (action.payload.id === Ids.TextToSpeech) {
    // Enable keyboard navigation
    yield put(ActionCreators.enable({ id: Ids.KeyboardNavigation }));
  }
}

export function* onPluginDisable(action: Action) {
  if (!isAction(action, ActionCreators.disable)) {
    return;
  }
  // On keyboard nav disable
  if (action.payload.id === Ids.KeyboardNavigation) {
    // Disable keyboard
    yield put(ActionCreators.disableKeyboard());
    // Disable text to speech
    yield put(ActionCreators.disable({ id: Ids.TextToSpeech }));
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
      console.time('Google Cloud transaction time');
      const response = yield AudioUtilities.synthesizeSpeechFromText({
        text
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
      Utility.throwError(error);
    }
  }
}

export function* onFocusNode(action: Action) {
  if (!isAction(action, ActionCreators.focusNode) || !action.payload.node) {
    return;
  }
  const state = yield select();
  if (new Selectors(state).getPlugin(Ids.TextToSpeech).enabled) {
    const text = Aria.getElementText({ element: action.payload.node });
    if (text) {
      // Perform text-to-speech if enabled
      yield synthesizeSpeech({ text });
    }
  }
}

/**
 * Executes plugin tasks on state change.
 * @param action
 * @returns {Generator<never, void, unknown>}
 */
export function* watchPluginTasks(action: any) {
  const plugin = Plugins.find(p => p.id === action.payload.id);
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
 * Observable stream for all `keydown` actions on document.
 *
 * @type {Stream<unknown, unknown>}
 */
const keyDownStream = Kefir.fromEvents(document, 'keydown');

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
 * Watches all `keydown` events.
 *
 * @returns {Generator<<"CALL", CallEffectDescriptor> | <"FORK", ForkEffectDescriptor>, void, unknown>}
 */
export function* watchKeyDown() {
  // Convert observable stream to channel
  const channel = yield call(toChannel, keyDownStream);

  yield takeLatest(channel, function*(val: any) {
    const state = yield select();
    if (new Selectors(state).isKeyboardEnabled()) {
      // Handle key down
      const node = yield handleKeyboardNavigation(val);
      yield put(ActionCreators.focusNode({ node }));
      // Immediately dispatch keyDown action for pressed key.
      yield put(ActionCreators.keyDown({ key: val.key }));
      // Delay before finalizing
      yield delay(2500);
      // Placeholder for cleanup logic
      yield put({ type: 'placeholder', payload: { id: 'something' } });
    }
  });
}

export function* watchAll() {
  yield all([
    takeEvery(ActionCreators.disable, onPluginDisable),
    takeEvery(ActionCreators.enable, onPluginEnable),
    takeEvery(ActionCreators.focusNode, onFocusNode),
    takeEvery(
      // Pattern to track all actions from reducer
      (action: Action) => isActionFrom(action, BaseReducer),
      watchPluginTasks
    ),
    call(watchKeyDown)
  ]);
}
