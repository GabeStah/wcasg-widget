import Utility from '@/utility';
import { StorageDataType } from '@/utility/store';
import config from 'config';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { makeElementEnabledSelector, makeElementErrorSelector } from '@/state';

import { IPluginAction } from 'classes/plugin/action';
import {
  IPluginElement,
  IPluginElementParams,
  PluginElement,
  PluginElementType
} from 'classes/plugin/element';
import styles from 'styles/plugin/element.scss';

interface IPluginElementToggleable extends IPluginElement {
  // Action(s) to execute when enabled
  actions: IPluginAction[];
}

// tslint:disable-next-line:no-empty-interface
interface IPluginElementToggleableParams extends IPluginElementParams {}

export class PluginElementToggleable extends PluginElement
  implements IPluginElementToggleable {
  public type: PluginElementType = PluginElementType.Toggleable;

  constructor(params?: IPluginElementToggleableParams) {
    super(params);

    if (params) {
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

  public initialize = (self: any): void => {
    if (this.enabled) {
      this.enableActions();
    }
  };

  public template = (self: any) => {
    const dispatch = useDispatch();

    const selectEnabled = useMemo(makeElementEnabledSelector, []);
    const enabled = useSelector(state => selectEnabled(state, this.id));

    const selectError = useMemo(makeElementErrorSelector, []);
    const error = useSelector(state => selectError(state, this.id));

    useEffect(() => {
      const currentState = this.getInstanceState();
      const newState = this.getInstanceState({ enabled });

      if (enabled !== this.enabled) {
        this.enabled = enabled;
      }

      // Update on change
      if (!isEqual(currentState, newState)) {
        this.update(enabled);
      }
    });

    const handleToggleClick = useCallback(
      () =>
        dispatch({
          type: 'toggle',
          payload: { id: this.id }
        }),
      [dispatch]
    );

    return (
      <div
        className={`${styles['plugin-element']} ${styles['plugin-element-toggleable']}`}
      >
        {error && error !== '' ? <h5>{error}</h5> : ''}
        <h3>{this.title}</h3>
        <button type={'button'} onClick={handleToggleClick}>
          {enabled ? 'Disable' : 'Enable'}
        </button>
      </div>
    );
  };
}
