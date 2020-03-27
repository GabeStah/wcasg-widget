import Store, { StorageDataType } from '@/utility/store';
import PluginManager from 'classes/plugin/manager';
import { Plugin } from '@/types';
import config from 'config';
import cloneDeep from 'lodash/cloneDeep';
import { put, select } from 'redux-saga/effects';
import { ActionCreators } from 'state/redux/actions';
import { Selectors } from 'state/redux/selectors';
import { defaultState, State } from 'state/redux/state';

/**
 * Load state data from local storage.
 *
 * @returns {Generator<never, void, unknown>}
 */
export function* loadStateFromLocalStorage() {
  const localState = Store.getFromLocalStorage({
    type: StorageDataType.All,
    withCompression: config.useLocalStorageCompression
  });

  // Iterate default plugins and find matches in local storage
  PluginManager.getInstance().plugins.forEach((plugin: Plugin) => {
    // Find in localState
    if (localState && localState.plugins) {
      const match = localState.plugins.find(
        (statePlugin: any) => statePlugin.id === plugin.id
      );
      if (match) {
        PluginManager.getInstance().setPluginInstanceState(match);
      }
    }
  });

  if (localState && localState.plugins) {
    // Remove plugins prop from localState to retain updates
    delete localState.plugins;
  }

  const newState: State = { ...defaultState, ...localState };
  return yield put(ActionCreators.reset({ newState }));
}

/**
 * Save state data to localStorage.
 *
 * @returns {Generator<<"SELECT", SelectEffectDescriptor>, void, unknown>}
 */
export function* saveStateToLocalStorage() {
  const state = yield select();
  if (state) {
    const pluginsState = new Selectors(state).getPluginsLocalState();
    const stateCopy = cloneDeep(state);
    stateCopy.plugins = pluginsState;
    Store.saveToLocalStorage({
      value: stateCopy,
      withCompression: config.useLocalStorageCompression,
      type: StorageDataType.All
    });
  }
}
