import { ValueManipulationType } from 'classes/plugin/action';
import { PluginComponent } from 'components/plugin';
import React from 'react';
import { PluginAction } from 'state/redux/state';

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
  actions: any;
  id: string;
  state: any;
}

export interface Plugin {
  id: string;
  customComponent?: boolean;
  enabled: boolean;
  options: PluginOption[];
  scaling?: PluginScaling;
  tasks: PluginAction[];
  title: string;
}
