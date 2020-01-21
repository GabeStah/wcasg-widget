import mapValues from 'lodash/mapValues';

import BasePlugin, { IPlugin } from 'plugins/base';
import initialState, { InitialStateType } from 'state/initialState';

import TextNodeType from 'classes/node-types/TextNodeType';
import { ScalableComponentProps } from 'components/scalable';
import { DOMManipulationType } from '@/plugins';

export interface IScalableState {
  id: string;
  current: number;
}

export interface IScalable extends IPlugin {
  propertyName: string;
  propertyUnit: string;
  nodeTypes: TextNodeType;
  defaults: ScalableDefaultsType;
  state: IScalableState;
  nodes: NodeList | null | undefined;
  displayValue: (plugin: IScalable, props: any) => string;
  onUpdate: (plugin: IScalable, props: any) => void;
}

export interface ScalableDefaultsType {
  current: number;
  increment: number;
  minimum: number;
  maximum: number;
}

export interface ScalableConstructorParams {
  id: string;
  domManipulationType?: DOMManipulationType;
  title: string;
  propertyName: string;
  propertyUnit?: string;
  nodeTypes: TextNodeType;
  defaults: ScalableDefaultsType;
  displayValue: (plugin: IScalable, props: any) => string;
  onUpdate: (plugin: IScalable, props: any) => void;
}

export default class Scalable extends BasePlugin implements IScalable {
  get initialState() {
    return {
      id: this.id,
      current: this.defaults.current
    };
  }

  public static actions = {
    decrement: (id: string) => {
      return {
        type: 'decrement',
        payload: { id }
      };
    },
    increment: (id: string) => {
      return {
        type: 'increment',
        payload: { id }
      };
    }
  };

  public static mapDispatchToProps = (dispatch: any, props: any) => {
    return mapValues(Scalable.actions, (action: (arg0: any) => any) => {
      return () => dispatch(action(props.id));
    });
  };

  public id: string;
  public title: string;
  public propertyName: string;
  public propertyUnit: string = 'px';
  public nodeTypes: TextNodeType;
  public defaults: ScalableDefaultsType;
  public state: IScalableState;
  public nodes: NodeList | null | undefined;
  public displayValue: (plugin: IScalable, props: any) => string;
  public onUpdate: (plugin: IScalable, props: any) => void;
  public domManipulationType: DOMManipulationType =
    DOMManipulationType.NodeQuery;

  public reducers = {
    decrement: (
      state: InitialStateType = initialState,
      action: { type: string; payload: any }
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
      action: { type: string; payload: any }
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

  constructor(params: ScalableConstructorParams) {
    super({ id: params.id, title: params.title });

    this.id = params.id;
    this.title = params.title;
    this.propertyName = params.propertyName;
    if (params.propertyUnit) {
      this.propertyUnit = params.propertyUnit;
    }
    this.nodeTypes = params.nodeTypes;
    this.defaults = params.defaults;
    this.state = this.initialState;
    this.displayValue = params.displayValue;
    this.onUpdate = params.onUpdate;
    if (params.domManipulationType) {
      this.domManipulationType = params.domManipulationType;
    }

    // Parse nodes from DOM tree
    this.nodes = this.nodeTypes.nodes();
  }

  public onMount(props: ScalableComponentProps) {
    // Update node attributes
    this.setDataAttributes();
    // Update DOM
    this.onUpdate(this, props);
  }

  /**
   * Assign data attributes to retain original values.
   */
  public setDataAttributes = () => {
    // Add attribute
    if (this.nodes && this.nodes.length > 0) {
      this.nodes.forEach(node => {
        // @ts-ignore
        const prop = node.style.getPropertyValue(this.propertyName);
        // Get computed value if property not explicitly assigned
        let value: string;
        if (prop && prop !== '') {
          value = prop;
        } else {
          value = window
            // @ts-ignore
            .getComputedStyle(node)
            .getPropertyValue(this.propertyName);
        }
        // @ts-ignore
        node.setAttribute(this.dataAttributeName, value);
      });
    }
  };
}
