import { PluginComponentParams } from '@/enum';
import { Typography } from '@material-ui/core';
import { PluginComponent } from 'components/plugin';
import Radio from 'components/radio';
import Scalable from 'components/scalable';
import ToggleButton from 'components/toggle-button';
import config from 'config';
import Modal from 'plugins/virtual-keyboard/keyboard/modal';
import React from 'react';
import { Selectors } from 'state/redux/selectors';

export const Component = ({ state, actions, id }: PluginComponentParams) => {
  const plugin = new Selectors(state).getPlugin(id);
  return (
    <div className={`${config.widgetId}-virtual-keyboard`}>
      <Typography component={'h2'}>{plugin.title}</Typography>
      <ToggleButton plugin={plugin} actions={actions} />
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
