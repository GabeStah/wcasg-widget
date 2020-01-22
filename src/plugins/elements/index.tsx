import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Utility from '@/utility';
import { InitialStateType } from '@/state';
import { IPluginAction } from '@/plugins';
import { IReducerActionParams, ReducerType } from '@/state';

interface IPlugin {
  id?: string;
  elements: IPluginElement[];
}

enum PluginElementType {
  Toggleable,
  Scalable,
  Selectable,
  Multiselectable
}

interface IPluginElement {
  id?: string;
  type: PluginElementType;
  // Actions only trigger when enabled.
  enabled?: boolean;
  // Display order
  order?: number;
  // If excluded use default based on type.
  template?: JSX.Element;
  // Children are enabled if parent is enabled.
  children?: IPluginElement[];
  // Actions to execute
  actions?: IPluginAction[];
  // Reducer type
  reducerType: ReducerType;
}

class PluginElement implements IPluginElement {
  public actions: IPluginAction[] = [];
  public children: IPluginElement[] = [];
  public enabled: boolean = true;
  public id: string = '';
  public order: number = 0;
  // public template?: JSX.Element = undefined;
  public type: PluginElementType = PluginElementType.Toggleable;
  public reducerType: ReducerType = ReducerType.Element;
  private _template?: JSX.Element;

  get template(): JSX.Element {
    return <div>Hello</div>;
    // return this._template;
  }

  set template(value: JSX.Element) {
    this._template = value;
  }
}

/**
 * Toggleable + Action.Class
 * Toggleable.Enabled = Apply Action(s)
 * Toggleable.Disabled = Remove Action(s)
 */

interface IPluginElementToggleable extends IPluginElement {
  // Action(s) to execute when toggled
  actions: IPluginAction[];
}

interface IPluginElementToggleableParams {
  actions?: IPluginAction[];
  children?: IPluginElement[];
  enabled?: boolean;
  id?: string;
  order?: number;
  // public template?: JSX.Element = undefined;
  type?: PluginElementType;
  template?: JSX.Element;
  // _template?: JSX.Element;
}

export class PluginElementToggleable implements IPluginElementToggleable {
  public id: string = Utility.generateGuid();
  public actions: IPluginAction[] = [];
  public children: IPluginElement[] = [];
  public enabled: boolean = true;
  public enabledState: boolean = true;
  public useEnabledState: any;
  public order: number = 0;
  // public template?: JSX.Element = undefined;
  public type: PluginElementType = PluginElementType.Toggleable;
  public reducerType: ReducerType = ReducerType.Element;
  public toggle = (): boolean => {
    // If already enabled, disable
    // if (this.enabled) {
    //   console.log(`toggle(): enabled: ${this.enabled}`);
    //   console.log(this);
    //   this.disableActions();
    // }
    // Toggle
    this.enabled = !this.enabled;
    // if (this.enabled) {
    //   console.log(`toggle(): enabled: ${this.enabled}`);
    //   console.log(this);
    //   this.enableActions();
    // }

    this.enabled ? this.enableActions() : this.disableActions();
    console.log(this.enabled);
    return this.enabled;
  };
  private _template = () => {
    // TODO: Use redux selector to get relevant state for this object
    const output = useSelector(state => console.log(state));
    // TODO: Use redux dispatch to send update action
    // See: https://react-redux.js.org/next/api/hooks#usedispatch
    const dispatch = useDispatch();
    const handleOnClick = () => {
      dispatch({
        type: 'toggle',
        reducerType: this.reducerType,
        payload: { id: this.id }
      });
      this.toggle();
    };
    return (
      <button type={'button'} onClick={handleOnClick}>
        {this.enabled ? 'Disable' : 'Enable'}
      </button>
    );
  };

  public reducers = {
    toggle: (state: InitialStateType, action: IReducerActionParams) => {
      console.log(`elements/index.tsx:reducers.toggle()`);
      const stateElementIndex = state.elements.findIndex(
        (element: { id: any }) => element.id === action.payload.id
      );
      const stateElement = state.elements[stateElementIndex];
      console.log(stateElement);
      stateElement.enabled = !stateElement.enabled;

      return Object.assign({}, state, { elements: state.elements });
    }
  };
  // public test = () => {
  //   // Declare a new state variable, which we'll call "count"
  //   const [count, setCount] = useState(0);
  //
  //   return (
  //     <div>
  //       <p>You clicked {count} times</p>
  //       <button onClick={() => setCount(count + 1)}>Click me</button>
  //     </div>
  //   );
  // };

  // public blah(props: PluginElementToggleable): JSX.Element {
  //   console.log(`blah..`);
  //   console.log(this);
  //   return (
  //     <button type={'button'} onClick={props.toggle}>
  //       {props.enabled ? 'Disable' : 'Enable'}
  //     </button>
  //   );
  // }
  //
  // public other(): any {
  //   return (
  //     <button type={'button'} onClick={this.toggle}>
  //       {this.enabled ? 'Disable' : 'Enable'}
  //     </button>
  //   );
  // }

  constructor(params?: IPluginElementToggleableParams) {
    if (params) {
      if (params.id) {
        this.id = params.id;
      }
      if (params.actions) {
        this.actions = params.actions;
      }
      if (params.children) {
        this.children = params.children;
      }
      if (params.enabled !== undefined) {
        this.enabled = params.enabled;
      }
      if (params.order) {
        this.order = params.order;
      }

      // [this.enabledState, this.useEnabledState] = useState(true);

      // if (params.template) {
      //   this.template = params.template;
      // }
    }

    // Initialize
    this.initialize();
  }

  public disableActions = (): void => {
    this.actions.forEach(action => {
      action.disable();
    });
  };

  public enableActions = (): void => {
    this.actions.forEach(action => {
      action.enable();
    });
  };

  public initialize = (): void => {
    if (this.enabled) {
      this.enableActions();
    }
  };

  get template(): any {
    return this._template();
  }

  set template(value: any) {
    this._template = value;
  }
}

/**
 * Scalable + Action.Class
 * on Scalable.value change: Apply Action using value
 * Toggleable.Disabled = Remove Action(s)
 */

interface IPluginElementScalable extends IPluginElement {
  actions: IPluginAction[];
}
