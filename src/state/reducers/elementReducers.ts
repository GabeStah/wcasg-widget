// import { initialState, PluginElements } from 'state/initialState';
// import { InitialStateType } from 'state/initialState';
// import { IReducerActionParams, ReducerType } from 'state/reducers/index';
//
// export const elementReducers = (
//   state: InitialStateType = initialState,
//   action: IReducerActionParams
// ) => {
//   console.log(`initialStatereducer`);
//   console.log(state);
//   if (state === undefined) return [];
//   if (action.type.includes('@@redux')) return state;
//   if (action.reducerType !== ReducerType.Element) return state;
//
//   // const plugin = PluginManager.find(action.payload.id);
//   console.log(`beforefind`);
//   console.log(PluginElements);
//   const element: any = PluginElements.find(
//     (e: { id: any }) => e.id === action.payload.id
//   );
//
//   console.log(`after`);
//
//   console.log(`Calling reducer for element:`);
//   console.log(element);
//   if (!element) return state;
//
//   return element.reducers[action.type](state, action);
//
//   // Invoke reducerType by key
//   // return plugin.reducers[action.type](state, action);
// };
//
// export default elementReducers;
