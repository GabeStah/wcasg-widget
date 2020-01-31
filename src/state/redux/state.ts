import { Plugin, PluginActionTypes } from '@/enum';
import PluginManager from 'classes/plugin/manager';

type FunctionType = (params?: any) => any;

export interface PluginAction {
  id?: string;
  name?: string;
  query?: string;
  on: PluginActionTypes;
  func?: FunctionType[];
}

export interface State {
  plugins: Plugin[];
  keyboard: {
    enabled: boolean;
    pressedKeys: any;
  };
  focusedNode: any;
}

export const defaultState: State = {
  plugins: PluginManager.getInstance().plugins,
  keyboard: {
    enabled: false,
    pressedKeys: {}
  },
  focusedNode: undefined
};
