import Dom from '@/utility/dom';
import config, { KeyModifier } from 'config';
import Kefir from 'kefir';
import { handleKeyboardNavigation } from 'plugins/keyboard-navigation/plugin';
import { call, put, select, takeLatest } from 'redux-saga/effects';
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
    // Minimize widget if expanded and Escape key pressed.
    if (new Selectors(state).isWidgetExpanded() && val.key === 'Escape') {
      yield put(ActionCreators.setWidgetIsExpanded({ value: false }));
    }

    // Toggle min/max if hotkey pressed
    if (val.key === config.widgetUnlockKey) {
      if (
        (config.widgetUnlockKeyModifier === KeyModifier.Ctrl &&
          val.ctrlKey &&
          !val.altKey &&
          !val.shiftKey) ||
        (config.widgetUnlockKeyModifier === KeyModifier.Shift &&
          val.shiftKey &&
          !val.altKey &&
          !val.ctrlKey) ||
        (config.widgetUnlockKeyModifier === KeyModifier.Alt &&
          val.altKey &&
          !val.shiftKey &&
          !val.ctrlKey)
      ) {
        const isExpanded = new Selectors(state).isWidgetExpanded();
        yield put(ActionCreators.setWidgetIsExpanded({ value: !isExpanded }));
      }
    }

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
