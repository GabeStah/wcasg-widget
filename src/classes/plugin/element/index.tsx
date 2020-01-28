import Utility from '@/utility';
import { StorageDataType } from '@/utility/store';
import { IPluginAction } from 'classes/plugin/action';
import { IPluginActionStyle } from 'classes/plugin/action/style';
import config from 'config';
import React from 'react';
import store from 'store2';

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
  // Track error displayed to user
  error: string;
  // Explicitly disable without allowing user interaction
  disabled?: boolean;
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
  disabled?: boolean;
  enabled?: boolean;
  error?: string;
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
  public disabled: boolean = false;
  public enabled: boolean = true;
  public error: string = '';
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
      if (params.disabled !== undefined) {
        this.disabled = params.disabled;
      }
      if (params.enabled !== undefined) {
        this.enabled = params.enabled;
      }
      if (params.error) {
        this.error = params.error;
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

  public getInstanceState(params?: {
    id?: string;
    enabled?: boolean;
    error?: string;
  }): any {
    return {
      id: params && params.id ? params.id : this.id,
      enabled:
        params && params.enabled !== undefined ? params.enabled : this.enabled,
      error: params && params.error !== undefined ? params.error : this.error
    };
  }

  public abstract setInstanceState(params?: any): void;

  public initialize = (self: any): void => {
    if (self.disabled) {
      return;
    }
    // Initialize name
    if (!this.name && this.title) {
      this.name = this.title.toLowerCase().replace(' ', '-');
    }
  };

  protected loadFromLocalStorage(): any {
    const data = Utility.Store.getFromLocalStorage({
      type: StorageDataType.Plugin,
      id: this.id,
      withCompression: config.useLocalStorageCompression
    });
    if (!data) {
      return;
    }
    this.setInstanceState(data);
  }

  private _template = (self: any) => undefined;
}
