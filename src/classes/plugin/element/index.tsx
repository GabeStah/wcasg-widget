import React from 'react';
import { IPluginAction } from 'classes/plugin/action';
import { IPluginActionStyle } from 'classes/plugin/action/style';
import Utility from '@/utility';

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

export type IPluginActionTypes = IPluginAction[] | IPluginActionStyle[];

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
  // Get the current or default state object
  getInstanceState: (params?: any) => any;
  // Executes on initialize
  initialize?: (self: any) => void;
}

export interface IPluginElementParams {
  actions?: IPluginActionTypes;
  children?: IPluginElement[];
  enabled?: boolean;
  id?: string;
  name?: string;
  initialize?: (self: any) => void;
  order?: number;
  template?: (self?: any) => any;
  title?: string;
  type?: PluginElementType;
}

export abstract class PluginElement implements IPluginElement {
  get template(): any {
    return this._template(this);
  }

  set template(value: any) {
    this._template = value;
  }
  public id: string = Utility.generateGuid();
  public actions: IPluginActionTypes = [];
  public children: IPluginElement[] = [];
  public enabled: boolean = true;
  public name: string = '';
  public order: number = 0;
  public type: PluginElementType = PluginElementType.Toggleable;
  public title: string = `Element: ${this.id}`;

  protected constructor(params?: IPluginElementParams) {
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
      if (params.initialize) {
        this.initialize = params.initialize;
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
  }

  public getInstanceState(params?: { id?: string; enabled?: boolean }): any {
    return {
      id: params && params.id ? params.id : this.id,
      enabled:
        params && params.enabled !== undefined ? params.enabled : this.enabled
    };
  }

  public initialize = (self: any): void => {
    // Initialize name
    if (!this.name && this.title) {
      this.name = this.title.toLowerCase().replace(' ', '-');
    }
  };
  private _template = (self: any) => undefined;
}
