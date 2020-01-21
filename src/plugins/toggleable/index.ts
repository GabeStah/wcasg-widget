import mapValues from 'lodash/mapValues';

import BasePlugin, { IPlugin } from 'plugins/base';
import initialState, { InitialStateType } from 'state/initialState';

import BodyNodeType from 'classes/node-types/BodyNodeType';
import { ToggleableComponentProps } from 'components/toggleable';
import { DOMManipulationType } from '@/plugins';

import styles from './styles.scss';

export interface IToggleableState {
  id: string;
  enabled: boolean;
}

export interface IToggleable extends IPlugin {
  defaults: ToggleableDefaultsType;
  displayValue: (
    plugin: IToggleable,
    props: ToggleableComponentProps
  ) => string;
  id: string;
  nodes: NodeList | null | undefined;
  nodeTypes: BodyNodeType;
  onUpdate: (plugin: IToggleable, props: ToggleableComponentProps) => void;
  propertyName: string;
  propertyUnit: string;
  state: IToggleableState;
  style: any;
  title: string;
  dataAttributeName: string;
}

export interface ToggleableDefaultsType {
  enabled: boolean;
}

export interface ToggleableConstructorParams {
  id: string;
  title: string;
  domManipulationType: DOMManipulationType;
  propertyName: string;
  propertyUnit: string;
  nodeTypes: BodyNodeType;
  defaults: ToggleableDefaultsType;
  displayValue: (
    plugin: IToggleable,
    props: ToggleableComponentProps
  ) => string;
  onUpdate: (plugin: IToggleable, props: ToggleableComponentProps) => void;
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

  public static mapStateToProps = (state: any, { id }: any): any => {
    const { plugins } = state.plugins;
    const statePlugin = plugins.find((plugin: { id: any }) => plugin.id === id);

    return { enabled: statePlugin.enabled };
  };

  public id: string;
  public title: string;
  public propertyName: string;
  public propertyUnit: string;
  public nodeTypes: BodyNodeType;
  public defaults: ToggleableDefaultsType;
  public state: IToggleableState;
  public nodes: NodeList | null | undefined;
  public domManipulationType: DOMManipulationType =
    DOMManipulationType.BodyClass;
  public displayValue: (
    plugin: IToggleable,
    props: ToggleableComponentProps
  ) => string;
  public onUpdate: (
    plugin: IToggleable,
    props: ToggleableComponentProps
  ) => void;

  public reducers = {
    toggle: (
      state: InitialStateType = initialState,
      action: { type: string; payload: any }
    ) => {
      const statePluginIndex = state.plugins.findIndex(
        plugin => plugin.id === action.payload.id
      );
      const statePlugin = state.plugins[statePluginIndex];
      statePlugin.enabled = !statePlugin.enabled;

      return Object.assign({}, state, { plugins: state.plugins });
    }
  };

  public get style(): any {
    return styles.highlightLinksBorder;
  }

  constructor(params: ToggleableConstructorParams) {
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
