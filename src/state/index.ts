import { combineReducers, createStore } from 'redux';

// import { initialState, PluginElements } from 'state/initialState';
// import { InitialStateType } from 'state/initialState';
// import { IReducerActionParams, ReducerType } from 'state/reducers/index';
import PluginManager from 'classes/plugin-manager';
import { PluginElementToggleable } from 'plugins/elements';
import { PluginActionClass } from '@/plugins';
import styles from 'components/widget/styles.scss';
import plugins from 'root/plugins.config';

export const elementReducers = (
  state: InitialStateType = initialState,
  action: IReducerActionParams
) => {
  console.log(`initialStatereducer`);
  console.log(state);
  if (action.type.includes('@@redux')) return state;
  if (action.reducerType !== ReducerType.Element) return state;

  const element: any = PluginElements.find(
    (e: { id: any }) => e.id === action.payload.id
  );

  if (!element) return state;

  return element.reducers[action.type](state, action);
};

export const pluginReducers = (
  state: InitialStateType = initialState,
  action: IReducerActionParams
) => {
  console.log(`initialStatereducer`);
  console.log(state);

  console.log(`pluginReducers`);
  console.log(state);
  console.log(action);
  // Short circuit if initial @@redux action
  if (action.type.includes('@@redux')) return state;
  if (action.reducerType !== ReducerType.Plugin) return state;

  console.log(`processing plugin reducer`);
  console.log(state);
  console.log(action);

  const plugin = PluginManager.find(action.payload.id);
  // Invoke reducerType by key
  return plugin.reducers[action.type](state, action);
};

export enum ReducerType {
  Plugin,
  Element
}

export interface IReducerActionParams {
  type: string;
  reducerType: ReducerType;
  payload: any;
}

export interface InitialStateType {
  plugins: any[];
  elements: any[];
}

export const PluginElements = [
  new PluginElementToggleable({
    actions: [
      new PluginActionClass({
        klass: [styles.emphasizeTitles]
      })
    ]
  })
];

// Initialize Plugins
PluginManager.add(plugins);

export const initialState: InitialStateType = {
  // TODO: Retain state by updating plugin properties?
  plugins: PluginManager.initialState,
  elements: PluginElements
};

// // Update initialState
// initialState.plugins = PluginManager.initialState;

const rootReducer = combineReducers({
  elements: elementReducers,
  plugins: pluginReducers
});

export const reducerInitializedStore = createStore(rootReducer);

console.log(reducerInitializedStore.getState());
