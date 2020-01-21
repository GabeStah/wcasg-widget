// @flow
import React from 'react';
import config from 'config';
import mapValues from 'lodash/mapValues';
import TextNodeType from 'classes/node-types/TextNodeType';
import type {
  IToggleableState,
  ToggleableDefaultsType
} from 'plugins/toggleable';

export interface IPlugin {
  get dataAttributeName(): string;
  // defaults: ToggleableDefaultsType;
  // displayValue: (plugin: IPlugin) => string;
  id: string;
  get initialState(): mixed;
  // nodes: ?NodeList<HTMLElement>;
  // nodeTypes: TextNodeType;
  onMount(): void;
  onUpdate: (plugin: IPlugin, props: any) => void;
  // propertyName: string;
  // propertyUnit: string;
  // state: IToggleableState;
  title: string;
}

export type BasePluginParamsType = {
  id: string,
  title: string,
  onUpdate: (plugin: IPlugin, props: any) => void
};

export default class BasePlugin implements IPlugin {
  id: string;
  title: string;
  onUpdate: (plugin: IPlugin, props: any) => void;

  constructor(params: BasePluginParamsType) {
    this.id = params.id;
    this.title = params.title;
    this.onUpdate = params.onUpdate;
  }

  static actions = {};

  onMount() {}

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

  get dataAttributeName() {
    return `data-${config.widgetId}-original-${this.id}`;
  }

  get initialState() {
    return {
      id: this.id
    };
  }
}
