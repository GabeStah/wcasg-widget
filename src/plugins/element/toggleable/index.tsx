import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPluginAction } from 'plugins/action';
import {
  IPluginElement,
  IPluginElementParams,
  PluginElement,
  PluginElementType
} from 'plugins/element';
import styles from 'styles/plugin/element.scss';

interface IPluginElementToggleable extends IPluginElement {
  // Action(s) to execute when toggled
  actions: IPluginAction[];
}

// tslint:disable-next-line:no-empty-interface
interface IPluginElementToggleableParams extends IPluginElementParams {}

export class PluginElementToggleable extends PluginElement
  implements IPluginElementToggleable {
  public type: PluginElementType = PluginElementType.Toggleable;

  constructor(params?: IPluginElementToggleableParams) {
    super(params);

    // Initialize
    this.initialize();
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

  public initialize = (): void => {
    if (this.enabled) {
      this.enableActions();
    }
  };

  public template = (self: any) => {
    const dispatch = useDispatch();

    const enabled = useSelector(
      (state: any) => self.getFromState(state).enabled
    );

    console.log(`toggleable/index:template()`);
    console.log(
      `toggleable/index:template(), self.update, enabled: ${enabled}`
    );
    console.log(this.actions);
    self.update(enabled);

    const handleOnClick = () => {
      dispatch({
        type: 'toggle',
        reducerType: self.reducerType,
        payload: { id: self.id }
      });
    };

    return (
      <div
        className={`${styles['plugin-element']} ${styles['plugin-element-toggleable']}`}
      >
        <h3>{self.title}</h3>
        <button type={'button'} onClick={handleOnClick}>
          {enabled ? 'Disable' : 'Enable'}
        </button>
      </div>
    );
  };
}
