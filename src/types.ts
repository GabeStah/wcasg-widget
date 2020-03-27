import { Theme } from '@material-ui/core/styles';
import { ValueManipulationType } from 'classes/plugin/action';
import { Connector } from 'state/redux/connectors';
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
  selectPropertyOption = 'selectPropertyOption'
}

export enum PluginPropertyComponentTypes {
  Radio = 'radio',
  Select = 'select',
  Switch = 'switch'
}

export interface PluginScaling {
  factor: number;
  increment: number;
  baseFactor: number;
  type: ValueManipulationType;
}

export interface PluginPropertyOption {
  id: string;
  selected?: boolean;
  text: string | number | boolean;
  value: string | number | boolean;
}

export interface PluginProperty {
  enablePluginOnChange?: boolean;
  disablePluginOnValue?: string | number | boolean;
  id: string;
  name?: string;
  options?: PluginPropertyOption[];
  componentType?: PluginPropertyComponentTypes;
  value?: any;
}

export interface PluginConfig {
  props: PluginProperty[];
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
  name?: string;
  onChangeHandler?: any;
  options?: SelectOption[];
  plugin: any;
  property?: PluginProperty;
  showLabel?: boolean;
  state: any;
}

export interface Plugin {
  id: string;
  config?: PluginConfig;
  customComponent?: boolean;
  enabled: boolean;
  optionCustom?: boolean;
  scaling?: PluginScaling;
  tasks: IPluginAction[];
  title: string;
}
