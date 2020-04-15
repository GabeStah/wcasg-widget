/* tslint:disable:object-literal-key-quotes */
import {
  PluginComponentParams,
  PluginProperty,
  PluginPropertyComponentTypes
} from '@/types';
import { createStyles, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import RadioComponent from 'components/radio';
import Scalable from 'components/scalable';
import SelectComponent from 'components/select';
import ToggleSwitch from 'components/toggle-switch';
import {Descriptions, Icons} from 'plugins/data';
import { HelpIcon } from 'components/icons/HelpIcon';
import React from 'react';
import { Selectors } from 'state/redux/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: `1px solid ${theme.palette.border.main}`,
      backgroundColor: theme.palette.background.default,
      height: '100%',
      position: 'relative'

      // boxSizing: 'border-box',
      // textAlign: 'center',
      // '&$enabled': {
      //   borderRadius: '20px',
      // }
    },
    enabled: {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.backgroundEnabled.main,
      height: '100%',
      position: 'relative'
    }
  })
);

export const PluginComponent = ({
  state,
  actions,
  id,
  children,
  theme,
  toggleDisabled
}: PluginComponentParams) => {
  const plugin = new Selectors(state).getPlugin(id);
  const properties = new Selectors(state).getPluginProperties(plugin.id);
  let autoComponents;

  if (properties) {
    autoComponents = properties.map((prop: PluginProperty) => {
      if (prop.componentType) {
        switch (prop.componentType) {
          case PluginPropertyComponentTypes.Radio:
            return (
              <RadioComponent
                actions={actions}
                plugin={plugin}
                property={prop}
                state={state}
                theme={theme}
              />
            );
          case PluginPropertyComponentTypes.Select:
            return (
              <SelectComponent
                actions={actions}
                plugin={plugin}
                property={prop}
                state={state}
              />
            );
          case PluginPropertyComponentTypes.Switch:
            return (
              <ToggleSwitch actions={actions} plugin={plugin} state={state} />
            );
          default:
        }
      }
    });
  }

  const classes = useStyles(theme);
  return (
    <Card
      variant={'outlined'}
      square
      classes={{ root: plugin.enabled ? classes.enabled : classes.root }}
    >
      <CardContent>
        <SvgIcon component={Icons[plugin.id]} />
        <Typography variant={'h3'} component={'h3'}>
          {plugin.title}
        </Typography>
        {!toggleDisabled && (
          <ToggleSwitch plugin={plugin} actions={actions} state={state} />
        )}
        {!plugin.optionCustom && autoComponents}
        {plugin.scaling && (
          <Scalable
            plugin={plugin}
            actions={actions}
            scaling={plugin.scaling}
            state={state}
          />
        )}
        {children}
      </CardContent>
      <HelpIcon id={plugin.id} text={Descriptions[plugin.id] ? Descriptions[plugin.id] : undefined} theme={theme}/>
    </Card>
  );
};
