import { Plugin, PluginScalableComponentParams, PluginScaling } from '@/enum';
import { areEqual, round } from '@/utility/number';
import { ValueManipulationType } from 'classes/plugin/action';
import React, { useEffect } from 'react';
import { Selectors } from 'state/redux/selectors';

export const Scalable = ({
  actions,
  autoToggle = true,
  plugin,
  scaling,
  showFactor = false,
  state
}: PluginScalableComponentParams) => {
  const statePlugin = new Selectors(state).getPlugin(plugin.id);
  let displayFactor = statePlugin.scaling?.factor.toFixed(2);
  if (statePlugin.scaling?.type === ValueManipulationType.PercentageScaling) {
    displayFactor = `${Math.round(statePlugin.scaling?.factor * 100)}%`;
  }

  /**
   * Toggle based on diff from baseFactor
   */
  const handleToggle = () => {
    if (autoToggle) {
      if (areEqual(scaling.factor, scaling.baseFactor)) {
        // Only change state if necessary
        if (statePlugin.enabled) {
          actions.disable(plugin.id);
        }
      } else {
        // Only change state if necessary
        if (!statePlugin.enabled) {
          actions.enable(plugin.id);
        }
      }
    }
  };

  // Toggle based on factor
  useEffect(() => handleToggle(), [statePlugin.scaling?.factor]);

  return (
    <>
      {showFactor && <p>Value: {displayFactor}</p>}
      <button
        onClick={() => actions.decrement(plugin.id)}
        aria-label={`Decrement ${plugin.title}`}
        aria-roledescription={'button'}
        role={'button'}
      >
        -
      </button>
      <button
        onClick={() => actions.increment(plugin.id)}
        aria-label={`Increment ${plugin.title}`}
        aria-roledescription={'button'}
        role={'button'}
      >
        +
      </button>
    </>
  );
};

export default Scalable;
