import { PluginComponentParams } from '@/types';
import { PluginComponent } from 'components/plugin';
import Modal from 'plugins/virtual-keyboard/keyboard/modal';
import React from 'react';
import { Selectors } from 'state/redux/selectors';

export const Component = ({
  state,
  actions,
  id,
  theme
}: PluginComponentParams) => {
  const plugin = new Selectors(state).getPlugin(id);
  return (
    <PluginComponent actions={actions} state={state} id={id} theme={theme}>
      <Modal isVisible={plugin.enabled} />
    </PluginComponent>
  );
};

export default Component;
