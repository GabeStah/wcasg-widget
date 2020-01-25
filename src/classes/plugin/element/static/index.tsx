import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { makeElementEnabledSelector } from '@/state';

import { IPluginAction } from 'classes/plugin/action';

import {
  IPluginElement,
  IPluginElementParams,
  PluginElement,
  PluginElementType
} from 'classes/plugin/element';
import styles from 'styles/plugin/element.scss';

interface IPluginElementStatic extends IPluginElement {
  // Action(s) to execute when enabled
  actions: IPluginAction[];
}

// tslint:disable-next-line:no-empty-interface
interface IPluginElementStaticParams extends IPluginElementParams {}

export class PluginElementStatic extends PluginElement
  implements IPluginElementStatic {
  public type: PluginElementType = PluginElementType.Static;

  constructor(params?: IPluginElementStaticParams) {
    super(params);

    if (params) {
      if (params.template) {
        this.template = params.template;
      }
    }

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

    const selectEnabled = useMemo(makeElementEnabledSelector, []);
    const enabled = useSelector(state => selectEnabled(state, this.id));

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
        <h3>{this.title}</h3>
        <button type={'button'} onClick={handleToggleClick}>
          {enabled ? 'Disable' : 'Enable'}
        </button>
      </div>
    );
  };
}
