import Dom from '@/utility/dom';
import Kefir from 'kefir';
import { Ids } from 'plugins/data';
import { handleKeyboardNavigation } from 'plugins/keyboard-navigation/plugin';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { ActionCreators } from 'state/redux/actions';
import { toChannel } from 'state/redux/sagas/index';
import { Selectors } from 'state/redux/selectors';

/**
 * Observable stream for all `keydown` actions on document.
 *
 * @type {Stream<unknown, unknown>}
 */
const keyDownStream = Kefir.fromEvents(document, 'keydown');

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
      // Immediately dispatch keyDown action for pressed key.
      yield put(ActionCreators.keyDown({ key: val.key }));

      // Check focusing input/text field.
      const focusedInputNode = Dom.isFocusedNodeInputField();
      if (!focusedInputNode) {
        // Handle keyboard navigation
        yield handleKeyboardNavigation(val);
      }

      // // Delay before finalizing
      // yield delay(2500);
      // // Placeholder for cleanup logic
      // yield put({ type: 'placeholder', payload: { id: 'something' } });
    }
  });
}
