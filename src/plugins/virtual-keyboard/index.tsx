import { PluginComponentParams } from '@/enum';
import { PluginComponent } from 'components/plugin';
import Modal from 'plugins/virtual-keyboard/keyboard/modal';
import React from 'react';
import { Selectors } from 'state/redux/selectors';

export const Component = ({ state, actions, id }: PluginComponentParams) => {
  const plugin = new Selectors(state).getPlugin(id);
  return (
    <PluginComponent actions={actions} state={state} id={id}>
      <Modal isVisible={plugin.enabled} />
    </PluginComponent>
  );
};

export default Component;
