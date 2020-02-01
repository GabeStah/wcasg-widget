import config from 'config';
import Kefir from 'kefir';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionCreators } from 'state/redux/actions';
import { toChannel } from 'state/redux/sagas/index';

let FOCUSED: any;
let PREVIOUS_FOCUSED: any;

/**
 * Tracks all bubbled blur events in DOM.
 */
document.addEventListener(
  'blur',
  e => {
    PREVIOUS_FOCUSED = undefined;
    FOCUSED = undefined;
  },
  true
);

/**
 * Tracks all bubbled focus events in DOM.
 */
document.addEventListener(
  'focus',
  e => {
    FOCUSED = e.target;
  },
  true
);

/**
 * Observable stream for all `focus` actions on document.
 * Only returns value when a newly focused node is set.
 * Interval determines frequency of poll checks.
 *
 * @type {Stream<unknown, unknown>}
 */
const focusStream = Kefir.fromPoll(config.focusPollFrequency, () => {
  // Check if new focus target
  if (FOCUSED && FOCUSED !== document.body && PREVIOUS_FOCUSED !== FOCUSED) {
    PREVIOUS_FOCUSED = FOCUSED;
    return FOCUSED;
  }
});

/**
 * Watches all `focus` events.
 *
 * @returns {Generator<<"CALL", CallEffectDescriptor> | <"FORK", ForkEffectDescriptor>, void, unknown>}
 */
export function* watchFocus() {
  // Convert observable stream to channel
  const channel = yield call(toChannel, focusStream);

  yield takeLatest(channel, function*(val: any) {
    if (val) {
      yield put(ActionCreators.focusNode({ node: val }));
    }
  });
}
