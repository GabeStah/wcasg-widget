import Aria from '@/utility/aria';
import Css from '@/utility/css';
import config from 'config';
import Kefir from 'kefir';
import { Ids } from 'plugins/data';
import { call, select, takeLatest } from 'redux-saga/effects';
import { toChannel } from 'state/redux/sagas/index';
import { Selectors } from 'state/redux/selectors';

let CLICKED: any;
let PREVIOUS_CLICKED: any;

/**
 * Tracks all bubbled blur events in DOM.
 */
document.addEventListener(
  'click',
  e => {
    CLICKED = e.target;
  },
  { capture: true, passive: true }
);

/**
 * Observable stream for all `click` actions on document.
 * Only returns value when a newly clicked node is set.
 * Interval determines frequency of poll checks.
 *
 * @type {Stream<unknown, unknown>}
 */
const clickStream = Kefir.fromPoll(config.clickPollFrequency, () => {
  // Check if new focus target
  if (CLICKED && CLICKED !== document.body && PREVIOUS_CLICKED !== CLICKED) {
    PREVIOUS_CLICKED = CLICKED;
    return CLICKED;
  }
});

/**
 * Watches all `click` events.
 *
 * @returns {Generator<<"CALL", CallEffectDescriptor> | <"FORK", ForkEffectDescriptor>, void, unknown>}
 */
export function* watchClick() {
  // Convert observable stream to channel
  const channel = yield call(toChannel, clickStream);

  yield takeLatest(channel, function* (val: any) {
    if (val) {
      const state = yield select();
      const textToSpeechPlugin = new Selectors(state).getPlugin(
        Ids.TextToSpeech
      );
      const textToSpeechBehaviorOption = new Selectors(
        state
      ).getPluginPropertySelectedOption({
        plugin: textToSpeechPlugin,
        property: 'behavior'
      });
      // Clear focus and focus clicked node.
      if (
        textToSpeechBehaviorOption &&
        textToSpeechPlugin.enabled &&
        textToSpeechBehaviorOption.id === 'click'
      ) {
        // Clear all focus
        Css.clearAllFocused();
        // Focus clicked node.
        yield Aria.focusNode({ node: val });
      }
    }
  });
}
