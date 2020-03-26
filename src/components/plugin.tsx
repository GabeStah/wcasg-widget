/* tslint:disable:object-literal-key-quotes */
import { PluginComponentParams } from '@/enum';
import { createStyles, Theme, withStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import SelectComponent from 'components/select';
import ToggleSwitch from 'components/toggle-switch';
import { Icons, Ids } from 'plugins/data';
import React from 'react';
import RadioComponent from 'components/radio';
import Scalable from 'components/scalable';
import { Selectors } from 'state/redux/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: `1px solid ${theme.palette.border.main}`,
      backgroundColor: theme.palette.background.default
      // boxSizing: 'border-box',
      // textAlign: 'center',
      // '&$enabled': {
      //   borderRadius: '20px',
      // }
    },
    enabled: {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.backgroundEnabled.main
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
        {!toggleDisabled && <ToggleSwitch plugin={plugin} actions={actions} />}
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
        {!plugin.optionCustom && plugin.options.length > 0 && (
          <SelectComponent
            actions={actions}
            plugin={plugin}
            // onChangeHandler={}
            options={plugin.options}
            state={state}
          />
          // <RadioComponent
          //   data={plugin.options}
          //   plugin={plugin}
          //   actions={actions}
          // />
        )}
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
    </Card>
  );
};
