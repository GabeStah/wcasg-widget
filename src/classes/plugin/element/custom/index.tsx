import Utility from '@/utility';
import { StorageDataType } from '@/utility/store';
import { IPluginAction } from 'classes/plugin/action';
import {
  IPluginElement,
  IPluginElementParams,
  PluginElement,
  PluginElementType
} from 'classes/plugin/element';
import config from 'config';
import React from 'react';
import styles from 'styles/plugin/element.scss';

interface IPluginElementCustom extends IPluginElement {
  // Action(s) to execute when enabled
  actions: IPluginAction[];
  options?: any;
}

// tslint:disable-next-line:no-empty-interface
interface IPluginElementCustomParams extends IPluginElementParams {
  options?: any;
}

export class PluginElementCustom extends PluginElement
  implements IPluginElementCustom {
  public type: PluginElementType = PluginElementType.Custom;
  public options: any = {};

  constructor(params?: IPluginElementCustomParams) {
    super(params);

    if (params) {
      if (params.options) {
        this.options = params.options;
      }

      if (params.template) {
        this.template = params.template;
      }
    }

    this.loadFromLocalStorage();

    this.initialize(this);
  }

  public setInstanceState(params?: {
    id?: string;
    enabled?: boolean;
    error?: string;
  }): void {
    this.enabled =
      params && params.enabled !== undefined ? params.enabled : this.enabled;
    this.error =
      params && params.error !== undefined ? params.error : this.error;
  }

  public update = (enabled: boolean): void => {
    enabled ? this.enableActions() : this.disableActions();
    // Update current state to local storage.
    Utility.Store.saveToLocalStorage({
      type: StorageDataType.Plugin,
      value: this,
      withCompression: config.useLocalStorageCompression
    });
  };

  public disableActions = (): void => {
    this.actions.forEach(action => {
      action.disable();
    });
  };

  public enableActions = (): void => {
    this.actions.forEach(action => {
      action.enable(null);
    });
  };

  public template = (self: any) => {
    return (
      <div
        className={`${styles['plugin-element']} ${styles['plugin-element-custom']}`}
      >
        {this.error && this.error !== '' ? <h5>{this.error}</h5> : ''}
        <h3>{this.title}</h3>
      </div>
    );
  };
}
