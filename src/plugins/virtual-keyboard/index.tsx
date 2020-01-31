import { PluginComponentParams } from '@/enum';
import { PluginComponent } from 'components/plugin';
import { Radio } from 'components/radio';
import { Scalable } from 'components/scalable';
import Modal from 'plugins/virtual-keyboard/keyboard/modal';
import React from 'react';
import { Selectors } from 'state/redux/selectors';

export const Component = ({ state, actions, id }: PluginComponentParams) => {
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
        {plugin.enabled ? 'Hide' : 'Show'}
      </button>
      {plugin.options.length > 0 && (
        <Radio data={plugin.options} plugin={plugin} actions={actions} />
      )}
      {plugin.scaling && (
        <Scalable plugin={plugin} actions={actions} scaling={plugin.scaling} />
      )}
      <Modal isVisible={plugin.enabled} />
    </div>
  );
};

export default Component;
