import { PluginComponentParams } from '@/enum';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ToggleSwitch from 'components/toggle-switch';
import React from 'react';
import RadioComponent from 'components/radio';
import Scalable from 'components/scalable';
import { Selectors } from 'state/redux/selectors';

export const PluginComponent = ({
  state,
  actions,
  id
}: PluginComponentParams) => {
  const plugin = new Selectors(state).getPlugin(id);
  return (
    <div>
      <Typography component={'h2'}>{plugin.title}</Typography>
      <ToggleSwitch plugin={plugin} actions={actions} />
      {/*<Button*/}
      {/*  onClick={() => {*/}
      {/*    if (plugin.enabled) {*/}
      {/*      actions.disable(plugin.id);*/}
      {/*    } else {*/}
      {/*      actions.enable(plugin.id);*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  aria-label={`${plugin.enabled ? 'Disable' : 'Enable'} ${plugin.title}`}*/}
      {/*  aria-roledescription={'button'}*/}
      {/*  role={'button'}*/}
      {/*  variant={'contained'}*/}
      {/*>*/}
      {/*  {plugin.enabled ? 'Disable' : 'Enable'}*/}
      {/*</Button>*/}
      {plugin.options.length > 0 && (
        <RadioComponent
          data={plugin.options}
          plugin={plugin}
          actions={actions}
        />
      )}
      {plugin.scaling && (
        <Scalable
          plugin={plugin}
          actions={actions}
          scaling={plugin.scaling}
          state={state}
        />
      )}
    </div>
  );
};
