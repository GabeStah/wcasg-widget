import { ValueManipulationType } from 'classes/plugin/action';
import { Actions } from 'immer-reducer';
import { Connector } from 'state/redux/connectors';
import { BaseReducer } from 'state/redux/reducers';
import { IPluginAction, State } from 'state/redux/state';

export enum PluginActionTypes {
  decrement = 'decrement',
  disable = 'disable',
  enable = 'enable',
  increment = 'increment',
  reset = 'reset',
  selectOption = 'selectOption'
}

export interface PluginScaling {
  factor: number;
  increment: number;
  baseFactor: number;
  type: ValueManipulationType;
}

export interface PluginOption {
  id: number;
  name: string;
  value: string | number | boolean;
  text: string;
  selected?: boolean;
}

export interface PluginComponentParams {
  actions: typeof Connector.__actions;
  id: string;
  state: State;
}

export interface PluginLocalState {
  id: string;
  enabled: boolean;
  options: PluginOption[];
  scaling?: PluginScaling;
  title: string;
}

export interface Plugin {
  id: string;
  customComponent?: boolean;
  enabled: boolean;
  options: PluginOption[];
  scaling?: PluginScaling;
  tasks: IPluginAction[];
  title: string;
}
