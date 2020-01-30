import React from 'react';
import { Radio } from 'components/radio';
import { Scalable } from 'components/scalable';
import { Selectors } from 'state/redux/selectors';

export const PluginComponent = ({
  state,
  actions,
  id,
  onEnable,
  onDisable
}: {
  state: any;
  actions: any;
  id: string;
  onEnable?: any;
  onDisable?: any;
}) => {
  const plugin = new Selectors(state).getPlugin(id);
  return (
    <div>
      <h2>{plugin.title}</h2>
      <button
        onClick={() => {
          if (plugin.enabled) {
            actions.disable(plugin.id);
            if (onDisable && typeof onDisable === 'function') {
              onDisable();
            }
          } else {
            actions.enable(plugin.id);
            if (onEnable && typeof onEnable === 'function') {
              onEnable();
            }
          }
        }}
      >
        {plugin.enabled ? 'Disable' : 'Enable'}
      </button>
      {plugin.options.length > 0 && (
        <Radio data={plugin.options} plugin={plugin} actions={actions} />
      )}
      {plugin.scalingFactor && <Scalable plugin={plugin} actions={actions} />}
    </div>
  );
};
