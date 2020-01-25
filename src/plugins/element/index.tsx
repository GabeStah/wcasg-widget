import React from 'react';
import { ReducerType } from '@/state';
import { IPluginAction } from 'plugins/action';
import Utility from '@/utility';
import { IPluginActionProperty } from 'plugins/action/property';

interface IPlugin {
  id?: string;
  name?: string;
  elements: IPluginElement[];
}

export enum PluginElementType {
  Toggleable,
  Scalable,
  Selectable,
  Multiselectable,
  Static,
  Custom
}

export type IPluginActionTypes = IPluginAction[] | IPluginActionProperty[];

export interface IPluginElement {
  id?: string;
  name?: string;
  title?: string;
  type: PluginElementType;
  // Actions only trigger when enabled.
  enabled?: boolean;
  // Display order
  order?: number;
  // If excluded use default based on type.
  template?: (self?: any) => any;
  // Children are enabled if parent is enabled.
  children?: IPluginElement[];
  // Actions to execute
  actions?: IPluginActionTypes;
  // Reducer type
  reducerType: ReducerType;
  // Get the current or default state object
  getInstanceState: (params?: any) => any;
}

export interface IPluginElementParams {
  actions?: IPluginActionTypes;
  children?: IPluginElement[];
  enabled?: boolean;
  id?: string;
  name?: string;
  order?: number;
  template?: (self?: any) => any;
  title?: string;
  type?: PluginElementType;
}

export class PluginElement implements IPluginElement {
  public id: string = Utility.generateGuid();
  public actions: IPluginActionTypes = [];
  public children: IPluginElement[] = [];
  public enabled: boolean = true;
  public name: string = '';
  public order: number = 0;
  public type: PluginElementType = PluginElementType.Toggleable;
  public reducerType: ReducerType = ReducerType.Element;
  public title: string = `Element: ${this.id}`;
  // public template: (self?: any) => any = (self?: any) => {};
  protected _template = (self: any) => {};

  public getInstanceState(params?: { id?: string; enabled?: boolean }): any {
    return {
      id: params && params.id ? params.id : this.id,
      enabled:
        params && params.enabled !== undefined ? params.enabled : this.enabled
    };
  }

  public getFromState = (state: any): IPluginElement => {
    // return state.elements.elements[this.id];
    return state.elements.elements.find((e: any) => e.id === this.id);
  };

  get template(): any {
    return this._template(this);
  }

  set template(value: any) {
    this._template = value;
  }

  constructor(params?: IPluginElementParams) {
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
      if (params.name) {
        this.name = params.name;
      }
      if (params.order) {
        this.order = params.order;
      }
      if (params.template) {
        this.template = params.template;
      }
      if (params.title) {
        this.title = params.title;
      }
    }

    // Initialize name
    if (!this.name && this.title) {
      this.name = this.title.toLowerCase().replace(' ', '-');
    }
  }
}
