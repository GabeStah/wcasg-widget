import { Plugin, PluginScaling } from '@/enum';
import { ValueManipulationType } from 'classes/plugin/action';
import React from 'react';

export const Scalable = ({
  plugin,
  actions,
  scaling
}: {
  plugin: Plugin;
  actions: any;
  scaling: PluginScaling;
}) => {
  let displayFactor = scaling.factor.toFixed(2);
  if (scaling.type === ValueManipulationType.PercentageScaling) {
    displayFactor = `${Math.round(scaling.factor * 100)}%`;
  }
  return (
    <>
      <p>Value: {displayFactor}</p>
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
