import PluginManager from 'classes/plugin-manager';

export interface InitialStateType {
  plugins: any[];
}

const initialState: InitialStateType = {
  // TODO: Retain state by updating plugin properties?
  plugins: PluginManager.initialState
};

export default initialState;
