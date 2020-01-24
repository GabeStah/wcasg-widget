import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IPluginElement,
  IPluginElementParams,
  PluginElement,
  PluginElementType
} from 'plugins/element';
import { PluginActionProperty } from 'plugins/action/property';
import styles from 'styles/plugin/element.scss';
import config from 'config';

/**
 * Scalable + Action.Class
 * on Scalable.value change: Apply Action using value
 * Toggleable.Disabled = Remove Action(s)
 */

export enum PluginElementScalingType {
  Percentage,
  Absolute
}

interface IPluginElementScalable extends IPluginElement {
  actions: PluginActionProperty[];
  scalingFactor: number;
  scalingIncrement: number;
  baseScalingFactor: number;
  // scalingType: PluginElementScalingType;
}

interface IPluginElementScalableParams extends IPluginElementParams {
  scalingIncrement?: number;
  value?: any;
  // scalingType?: PluginElementScalingType;
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

  get defaultState(): any {
    return {
      id: this.id,
      enabled: this.enabled,
      scalingFactor: this.scalingFactor
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

  public template = (self: any) => {
    const enabled = useSelector(
      (state: any) => self.getFromState(state).enabled
    );
    const scalingFactor = useSelector(
      (state: any) => self.getFromState(state).scalingFactor
    );
    self.scalingFactor = scalingFactor;

    self.update(enabled);

    const dispatch = useDispatch();

    const handleReset = () => {
      dispatch({
        type: 'reset',
        reducerType: self.reducerType,
        payload: { id: self.id }
      });
    };

    const handleToggleClick = () => {
      dispatch({
        type: 'toggle',
        reducerType: self.reducerType,
        payload: { id: self.id }
      });
    };

    const handleScaling = (adjustment: number): any => {
      dispatch({
        type: 'scale',
        reducerType: self.reducerType,
        payload: { id: self.id, adjustment }
      });
    };

    return (
      <div
        className={`${styles['plugin-element']} ${styles['plugin-element-scalable']}`}
      >
        <h3>{self.title}</h3>
        <p>Current Adjustment: {parseFloat(scalingFactor).toFixed(2)}</p>
        <button type={'button'} onClick={() => handleToggleClick()}>
          {enabled ? 'Disable' : 'Enable'}
        </button>
        <button
          type={'button'}
          onClick={() => handleScaling(self.scalingIncrement * -1)}
        >
          -
        </button>
        <button
          type={'button'}
          onClick={() => handleScaling(self.scalingIncrement)}
        >
          +
        </button>
      </div>
    );
  };
}
