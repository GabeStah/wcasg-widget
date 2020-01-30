import { Plugin, PluginActionTypes } from '@/enum';
import { Plugins } from '@/globals';

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
  plugins: Plugins,
  keyboard: {
    enabled: false,
    pressedKeys: {}
  },
  focusedNode: undefined
};
