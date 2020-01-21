// @flow
import React from 'react';
import mapValues from 'lodash/mapValues';

import type { IPlugin } from 'plugins/base';
import type { InitialStateType } from 'state/initialState';

import TextNodeType from 'classes/node-types/TextNodeType';
import BasePlugin from 'plugins/base';

import initialState from 'state/initialState';

export interface IScalableState {
  id: string;
  current: number;
}

export interface IScalable extends IPlugin {
  id: string;
  title: string;
  propertyName: string;
  propertyUnit: string;
  nodeTypes: TextNodeType;
  defaults: ScalableDefaultsType;
  state: IScalableState;
  nodes: ?NodeList<HTMLElement>;
  get dataAttributeName(): string;
  displayValue: (plugin: IScalable) => string;
  onUpdate: (plugin: IScalable) => void;
}

export type ScalableDefaultsType = {
  current: number,
  increment: number,
  minimum: number,
  maximum: number
};

export type ScalableConstructorParams = {
  id: string,
  title: string,
  propertyName: string,
  propertyUnit: string,
  nodeTypes: TextNodeType,
  defaults: ScalableDefaultsType,
  displayValue: (plugin: IScalable) => string,
  onUpdate: (plugin: IScalable) => void
};

export default class Scalable extends BasePlugin implements IScalable {
  id: string;
  title: string;
  propertyName: string;
  propertyUnit: string;
  nodeTypes: TextNodeType;
  defaults: ScalableDefaultsType;
  state: IScalableState;
  nodes: ?NodeList<HTMLElement>;
  displayValue: (plugin: IScalable) => string;
  onUpdate: (plugin: IScalable) => void;

  constructor(params: ScalableConstructorParams) {
    super({ id: params.id, title: params.title });

    this.id = params.id;
    this.title = params.title;
    this.propertyName = params.propertyName;
    this.propertyUnit = params.propertyUnit;
    this.nodeTypes = params.nodeTypes;
    this.defaults = params.defaults;
    this.state = this.initialState;
    this.displayValue = params.displayValue;
    this.onUpdate = params.onUpdate;

    // Parse nodes from DOM tree
    this.nodes = this.nodeTypes.nodes();
  }

  static actions = {
    decrement: (id: string) => {
      return {
        type: 'decrement',
        payload: { id: id }
      };
    },
    increment: (id: string) => {
      return {
        type: 'increment',
        payload: { id: id }
      };
    }
  };

  onMount() {
    // Update node attributes
    this.setDataAttributes();
    // Update DOM
    this.onUpdate();
  }

  get initialState() {
    return {
      id: this.id,
      current: this.defaults.current
    };
  }

  static mapDispatchToProps = (dispatch: any, props: any) => {
    return mapValues(this.actions, action => {
      return () => dispatch(action(props.id));
    });
  };

  static mapStateToProps = (state: any, { id }: any) => {
    // Extract reducers from combined state.
    const { plugins } = state.plugins;
    const statePlugin = plugins.find(plugin => plugin.id === id);

    return { current: statePlugin.current };
  };

  reducers = {
    decrement: (
      state: InitialStateType = initialState,
      action: { type: string, payload: any }
    ) => {
      const statePluginIndex = state.plugins.findIndex(
        plugin => plugin.id === action.payload.id
      );
      const statePlugin = state.plugins[statePluginIndex];
      const diff = statePlugin.current - this.defaults.increment;

      statePlugin.current =
        diff < this.defaults.minimum ? this.defaults.minimum : diff;

      return Object.assign({}, state, { plugins: state.plugins });
    },
    increment: (
      state: InitialStateType = initialState,
      action: { type: string, payload: any }
    ) => {
      const statePluginIndex = state.plugins.findIndex(
        plugin => plugin.id === action.payload.id
      );
      const statePlugin = state.plugins[statePluginIndex];
      const diff = statePlugin.current + this.defaults.increment;

      statePlugin.current =
        diff > this.defaults.maximum ? this.defaults.maximum : diff;

      return Object.assign({}, state, { plugins: state.plugins });
    }
  };

  /**
   * Assign data attributes to retain original values.
   */
  setDataAttributes = () => {
    // Add attribute
    if (this.nodes && this.nodes.length > 0) {
      this.nodes.forEach(node => {
        const prop = node.style.getPropertyValue(this.propertyName);
        // Get computed value if property not explicitly assigned
        const value =
          prop && prop !== ''
            ? prop
            : window.getComputedStyle(node).getPropertyValue(this.propertyName);
        node.setAttribute(this.dataAttributeName, value);
      });
    }
  };
}
