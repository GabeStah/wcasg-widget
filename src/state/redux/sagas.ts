import { isAction, Actions, isActionFrom } from 'immer-reducer';
import { Action } from 'redux';
import { put, select, takeEvery, all } from 'redux-saga/effects';
import { PluginActions, PluginReducer } from 'state/redux/actions';
import { Plugins, PluginSelectors } from 'state/redux/state';

export function* onPluginToggle(action: Action) {
  if (!isAction(action, PluginActions.toggle)) {
    return;
  }

  // When text to speech enabled, ensure keyboard navigation enabled
  if (action.payload.id === Plugins['text-to-speech'].id) {
    const state = yield select();
    const selectors = new PluginSelectors(state);
    const plugin = selectors.getPlugin(action.payload.id);
    if (plugin.enabled) {
      yield put(
        PluginActions.enable({ id: Plugins['keyboard-navigation'].id })
      );
    }
  }

  // When keyboard navigation disabled, disable text to speech
  if (action.payload.id === Plugins['keyboard-navigation'].id) {
    const state = yield select();
    const selectors = new PluginSelectors(state);
    const plugin = selectors.getPlugin(action.payload.id);
    if (!plugin.enabled) {
      yield put(PluginActions.disable({ id: Plugins['text-to-speech'].id }));
    }
  }
}

export function* onPluginEnable(action: Action) {
  if (!isAction(action, PluginActions.enable)) {
    return;
  }
  // On text to speech enable
  if (action.payload.id === Plugins['text-to-speech'].id) {
    // Enable keyboard navigation
    yield put(PluginActions.enable({ id: Plugins['keyboard-navigation'].id }));
  }
}

export function* onPluginDisable(action: Action) {
  if (!isAction(action, PluginActions.disable)) {
    return;
  }
  // On keyboard nav disable
  if (action.payload.id === Plugins['keyboard-navigation'].id) {
    // Disable text to speech
    yield put(PluginActions.disable({ id: Plugins['text-to-speech'].id }));
  }
}

// or use the isActionFrom() to get all actions from a specific ImmerReducer
// action creators object
export function* watchImmerActions() {
  yield takeEvery(
    (action: Action) => isActionFrom(action, PluginReducer),
    handleImmerReducerAction
  );
}

function* handleImmerReducerAction(action: Actions<typeof PluginReducer>) {
  // `action` is a union of action types
  if (isAction(action, PluginActions.toggle)) {
    // with action of toggle
    console.log(`handleIMmerReducerAction: isAction.toggle`);
    console.log(action);
  }
}

// takeEvery(
//   // Pattern to track all actions from reducer
//   (action: Action) => isActionFrom(action, PluginReducer),
//   watchPluginToggle
// ),

export function* watchAll() {
  yield all([
    takeEvery(PluginActions.disable, onPluginDisable),
    takeEvery(PluginActions.enable, onPluginEnable),
    takeEvery(PluginActions.toggle, onPluginToggle)
  ]);
}
