import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import {
  IPluginElement,
  IPluginElementParams,
  PluginElement,
  PluginElementType
} from 'plugins/element';
import { PluginActionProperty } from 'plugins/action/property';
import styles from 'styles/plugin/element.scss';
import {
  makeElementEnabledSelector,
  makeElementScalingFactorSelector
} from '@/state';

interface IPluginElementScalable extends IPluginElement {
  actions: PluginActionProperty[];
  scalingFactor: number;
  scalingIncrement: number;
  baseScalingFactor: number;
}

interface IPluginElementScalableParams extends IPluginElementParams {
  scalingIncrement?: number;
  value?: any;
}

export class PluginElementScalable extends PluginElement
  implements IPluginElementScalable {
  // Force inferred assignment since parent handles it
  public actions!: PluginActionProperty[];
  public type: PluginElementType = PluginElementType.Scalable;
  public scalingFactor: number = 0;
  public scalingIncrement: number = 1;
  public baseScalingFactor: number = 0;

  constructor(params?: IPluginElementScalableParams) {
    super(params);

    if (params) {
      if (params.scalingIncrement) {
        this.scalingIncrement = params.scalingIncrement;
      }
      if (params.value) {
        this.scalingFactor = params.value;
        // Retain base value for later reference
        this.baseScalingFactor = params.value;
      }
    }

    // Initialize
    this.initialize();
  }

  public update = (enabled: boolean): void => {
    enabled ? this.enableActions() : this.disableActions();
  };

  public getInstanceState(params?: {
    id?: string;
    enabled?: boolean;
    scalingFactor?: number;
  }): any {
    return {
      id: params && params.id ? params.id : this.id,
      enabled:
        params && params.enabled !== undefined ? params.enabled : this.enabled,
      scalingFactor:
        params && params.scalingFactor
          ? params.scalingFactor
          : this.scalingFactor
    };
  }

  public enableActions = (): void => {
    this.actions.forEach(action => {
      action.enable({ scalingFactor: this.scalingFactor });
    });
  };

  public disableActions = (): void => {
    this.actions.forEach(action => {
      action.disable();
    });
  };

  public initialize = (): void => {
    if (this.enabled) {
      this.enableActions();
    }
  };

  public template = () => {
    const dispatch = useDispatch();

    const selectEnabled = useMemo(makeElementEnabledSelector, []);
    const enabled = useSelector(state => selectEnabled(state, this.id));

    const selectScalingFactor = useMemo(makeElementScalingFactorSelector, []);
    const scalingFactor = useSelector(state =>
      selectScalingFactor(state, this.id)
    );

    useEffect(() => {
      const currentState = this.getInstanceState();
      const newState = this.getInstanceState({ enabled, scalingFactor });
      if (scalingFactor !== this.scalingFactor) {
        this.scalingFactor = scalingFactor;
      }
      if (enabled !== this.enabled) {
        this.enabled = enabled;
      }

      // Update on change
      if (!isEqual(currentState, newState)) {
        this.update(enabled);
      }
    });

    const handleToggleClick = () => {
      dispatch({
        type: 'toggle',
        reducerType: this.reducerType,
        payload: { id: this.id }
      });
    };

    const handleScaling = (adjustment: number): any => {
      dispatch({
        type: 'scale',
        reducerType: this.reducerType,
        payload: { id: this.id, adjustment }
      });
    };

    return (
      <div
        className={`${styles['plugin-element']} ${styles['plugin-element-scalable']}`}
      >
        <h3>{this.title}</h3>
        <p>Current Adjustment: {parseFloat(scalingFactor).toFixed(2)}</p>
        <button type={'button'} onClick={() => handleToggleClick()}>
          {enabled ? 'Disable' : 'Enable'}
        </button>
        <button
          type={'button'}
          onClick={() => handleScaling(this.scalingIncrement * -1)}
        >
          -
        </button>
        <button
          type={'button'}
          onClick={() => handleScaling(this.scalingIncrement)}
        >
          +
        </button>
      </div>
    );
  };
}
