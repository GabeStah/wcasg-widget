import { Theme } from '@material-ui/core/styles';
import { ValueManipulationType } from 'classes/plugin/action';
import { PluginConfig } from 'classes/plugin/config';
import { Actions } from 'immer-reducer';
import { Connector } from 'state/redux/connectors';
import { BaseReducer } from 'state/redux/reducers';
import { IPluginAction, State } from 'state/redux/state';

export interface DialogComponentParams {
  state: State;
  theme?: Theme;
}

export interface StatementDialogComponentParams extends DialogComponentParams {
  type?: 'iframe' | 'inline' | 'download';
}

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

export interface OptionGroup {
  id: string;
  name?: string;
  options: PluginOption[] | RadioOption[] | SelectOption[];
  text?: string;
}

export interface PluginOption {
  id: number;
  name: string;
  selected?: boolean;
  text: string;
  value: string | number | boolean;
}

export interface RadioOption {
  id?: number;
  selected?: boolean;
  text?: string;
  value: string | number | boolean;
}

export interface SelectOption {
  id?: number;
  isGroup?: boolean;
  options?: SelectOption[];
  selected?: boolean;
  text?: string;
  value: string | number | boolean;
}

export interface PluginComponentParams {
  actions: typeof Connector.__actions;
  toggleDisabled?: boolean;
  children?: any;
  id: string;
  state: State;
  theme: Theme;
}

export interface PluginScalableComponentParams {
  actions: typeof Connector.__actions;
  autoToggle?: boolean;
  plugin: Plugin;
  scaling: PluginScaling;
  showFactor?: boolean;
  state: State;
  theme?: Theme;
}

export interface PluginSelectComponentParams {
  actions: typeof Connector.__actions;
  autoToggle?: boolean;
  name?: string;
  onChangeHandler?: any;
  options: PluginOption[] | SelectOption[];
  plugin: any;
  showLabel?: boolean;
  state: any;
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
  config?: PluginConfig;
  customComponent?: boolean;
  enabled: boolean;
  optionName?: string;
  optionCustom?: boolean;
  options?: OptionGroup[];
  scaling?: PluginScaling;
  tasks: IPluginAction[];
  title: string;
}
