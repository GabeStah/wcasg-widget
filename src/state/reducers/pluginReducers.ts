import initialState from 'state/initialState';
import PluginManager from 'classes/plugin-manager';
import { InitialStateType } from 'state/initialState';

export const pluginReducers = (
  state: InitialStateType = initialState,
  action: { type: string; payload: any }
) => {
  // Short circuit if initial @@redux action
  if (action.type.includes('@@redux')) return state;

  const plugin = PluginManager.find(action.payload.id);
  // Invoke reducer by key
  return plugin.reducers[action.type](state, action);
};

export default pluginReducers;
