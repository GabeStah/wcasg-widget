import mapValues from 'lodash/mapValues';

import { IPlugin } from 'plugins/base';
import { InitialStateType } from 'state/initialState';

import TextNodeType from 'classes/node-types/TextNodeType';
import BasePlugin from 'plugins/base';

import initialState from 'state/initialState';
import { ToggleableComponentProps } from 'components/toggleable';

export interface IToggleableState {
  id: string;
  enabled: boolean;
}

export interface IToggleable extends IPlugin {
  defaults: ToggleableDefaultsType;
  displayValue: <T>(plugin: T, props: any) => string;
  id: string;
  nodes: NodeList | null | undefined;
  nodeTypes: TextNodeType;
  onUpdate: <T>(plugin: T, props: any) => void;
  propertyName: string;
  propertyUnit: string;
  state: IToggleableState;
  title: string;
  dataAttributeName: string;
}

export interface ToggleableDefaultsType {
  enabled: true;
}

export interface ToggleableConstructorParams {
  id: string;
  title: string;
  propertyName: string;
  propertyUnit: string;
  nodeTypes: TextNodeType;
  defaults: ToggleableDefaultsType;
  displayValue: <T>(plugin: T, props: any) => string;
  onUpdate: <T>(plugin: T, props: any) => void;
}

export default class Toggleable extends BasePlugin implements IToggleable {
  get initialState() {
    return {
      id: this.id,
      enabled: this.defaults.enabled
    };
  }

  public static actions = {
    toggle: (id: string) => {
      return {
        type: 'toggle',
        payload: { id }
      };
    }
  };

  public static mapDispatchToProps = (dispatch: any, props: any) => {
    return mapValues(Toggleable.actions, (action: (arg0: any) => any) => {
      return () => dispatch(action(props.id));
    });
  };

  public static mapStateToProps = (state: any, { id }: any) => {
    // Extract reducers from combined state.
    const { plugins } = state.plugins;
    const statePlugin = plugins.find((plugin: { id: any }) => plugin.id === id);

    return { current: statePlugin.current };
  };
  public id: string;
  public title: string;
  public propertyName: string;
  public propertyUnit: string;
  public nodeTypes: TextNodeType;
  public defaults: ToggleableDefaultsType;
  public state: IToggleableState;
  public nodes: NodeList | null | undefined;
  public displayValue: <T>(plugin: T, props: any) => string;
  public onUpdate: <T>(plugin: T, props: any) => void;

  public reducers = {
    decrement: (
      state: InitialStateType = initialState,
      action: { type: string; payload: any }
    ) => {
      // const statePluginIndex = state.plugins.findIndex(
      //   plugin => plugin.id === action.payload.id
      // );
      // const statePlugin = state.plugins[statePluginIndex];
      // const diff = statePlugin.current - this.defaults.increment;
      //
      // statePlugin.current =
      //   diff < this.defaults.minimum ? this.defaults.minimum : diff;

      return Object.assign({}, state, { plugins: state.plugins });
    },
    increment: (
      state: InitialStateType = initialState,
      action: { type: string; payload: any }
    ) => {
      // const statePluginIndex = state.plugins.findIndex(
      //   plugin => plugin.id === action.payload.id
      // );
      // const statePlugin = state.plugins[statePluginIndex];
      // const diff = statePlugin.current + this.defaults.increment;
      //
      // statePlugin.current =
      //   diff > this.defaults.maximum ? this.defaults.maximum : diff;

      return Object.assign({}, state, { plugins: state.plugins });
    }
  };

  constructor(params: ToggleableConstructorParams) {
    // super({ id: params.id, title: params.title, onUpdate: params.onUpdate<IToggleable> });
    super(params);

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

  public onMount(props: ToggleableComponentProps) {
    // Update node attributes
    this.setDataAttributes();
    // Intial DOM update
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
