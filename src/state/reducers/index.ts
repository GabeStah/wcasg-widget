// import { combineReducers } from 'redux';
// import elementReducers from 'state/reducers/elementReducers';
// import pluginReducers from 'state/reducers/pluginReducers';
// import { PluginElementToggleable } from 'plugins/elements';
// import { PluginActionClass } from '@/plugins';
// import styles from 'components/widget/styles.scss';
// import PluginManager from 'classes/plugin-manager';
//
// export enum ReducerType {
//   Plugin,
//   Element
// }
//
// export interface IReducerActionParams {
//   type: string;
//   reducerType: ReducerType;
//   payload: any;
// }
//
// export interface InitialStateType {
//   plugins: any[];
//   elements: any[];
// }
//
// // Testing
//
// export const PluginElements = [
//   new PluginElementToggleable({
//     actions: [
//       new PluginActionClass({
//         klass: [styles.emphasizeTitles]
//       })
//     ]
//   })
// ];
//
// export const initialState: InitialStateType = {
//   // TODO: Retain state by updating plugin properties?
//   plugins: PluginManager.initialState,
//   // plugins: [],
//   elements: PluginElements
// };
//
// // TODO: Fix bug where imported reducers return undefined
// export default combineReducers({
//   elements: elementReducers,
//   plugins: pluginReducers
// });
