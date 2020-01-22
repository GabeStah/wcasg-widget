// import PluginManager from 'classes/plugin-manager';
// import { initialState, InitialStateType } from 'state/initialState';
// import { IReducerActionParams, ReducerType } from 'state/reducers/index';
//
// export const pluginReducers = (
//   state: InitialStateType = initialState,
//   action: IReducerActionParams
// ) => {
//   console.log(`initialStatereducer`);
//   console.log(state);
//   if (state === undefined) return [];
//
//   console.log(`pluginReducers`);
//   console.log(state);
//   console.log(action);
//   // Short circuit if initial @@redux action
//   if (action.type.includes('@@redux')) return state;
//   if (action.reducerType !== ReducerType.Plugin) return state;
//
//   console.log(`processing plugin reducer`);
//   console.log(state);
//   console.log(action);
//
//   const plugin = PluginManager.find(action.payload.id);
//   // Invoke reducerType by key
//   return plugin.reducers[action.type](state, action);
// };
//
// export default pluginReducers;
