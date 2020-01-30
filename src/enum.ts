import { PluginAction } from 'state/redux/state';

export enum PluginActionTypes {
  decrement = 'decrement',
  disable = 'disable',
  enable = 'enable',
  increment = 'increment',
  reset = 'reset',
  selectOption = 'selectOption'
}

export interface PluginOption {
  id: number;
  name: string;
  value: string | number | boolean;
  text: string;
  selected?: boolean;
}

export interface Plugin {
  id: string;
  title: string;
  enabled: boolean;
  scalingFactor?: number;
  tasks: PluginAction[];
  options: PluginOption[];
}
