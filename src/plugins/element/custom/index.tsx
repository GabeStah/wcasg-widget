import React from 'react';
import { IPluginAction } from 'plugins/action';
import {
  IPluginElement,
  IPluginElementParams,
  PluginElement,
  PluginElementType
} from 'plugins/element';
import styles from 'styles/plugin/element.scss';

interface IPluginElementCustom extends IPluginElement {
  // Action(s) to execute when enabled
  actions: IPluginAction[];
  options?: any;
}

// tslint:disable-next-line:no-empty-interface
interface IPluginElementCustomParams extends IPluginElementParams {
  options?: any;
  initialize?: any;
}

export class PluginElementCustom extends PluginElement
  implements IPluginElementCustom {
  public type: PluginElementType = PluginElementType.Custom;
  public options: any = {};

  constructor(params?: IPluginElementCustomParams) {
    super(params);

    if (params) {
      if (params.initialize) {
        this.initialize = params.initialize;
      }

      if (params.options) {
        this.options = params.options;
      }

      if (params.template) {
        this.template = params.template;
      }
    }

    // Initialize
    this.initialize(this);
  }

  public update = (enabled: boolean): void => {
    enabled ? this.enableActions() : this.disableActions();
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

  public initialize = (self: any): void => {};

  public template = (self: any) => {
    return (
      <div
        className={`${styles['plugin-element']} ${styles['plugin-element-custom']}`}
      >
        <h3>{this.title}</h3>
      </div>
    );
  };
}
