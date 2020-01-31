import { PluginComponentParams } from '@/enum';
import React from 'react';
import { Radio } from 'components/radio';
import { Scalable } from 'components/scalable';
import { Selectors } from 'state/redux/selectors';

export const PluginComponent = ({
  state,
  actions,
  id
}: PluginComponentParams) => {
  const plugin = new Selectors(state).getPlugin(id);
  return (
    <div>
      <h2>{plugin.title}</h2>
      <button
        onClick={() => {
          if (plugin.enabled) {
            actions.disable(plugin.id);
          } else {
            actions.enable(plugin.id);
          }
        }}
      >
        {plugin.enabled ? 'Disable' : 'Enable'}
      </button>
      {plugin.options.length > 0 && (
        <Radio data={plugin.options} plugin={plugin} actions={actions} />
      )}
      {plugin.scaling && (
        <Scalable plugin={plugin} actions={actions} scaling={plugin.scaling} />
      )}
    </div>
  );
};
