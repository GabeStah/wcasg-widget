/* tslint:disable:object-literal-key-quotes */
import { PluginComponentParams } from '@/enum';
import palette, { colors } from '@/theme/palette';
import { withStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import ToggleSwitch from 'components/toggle-switch';
import {Icons, Ids} from 'plugins/data';
import React from 'react';
import RadioComponent from 'components/radio';
import Scalable from 'components/scalable';
import { Selectors } from 'state/redux/selectors';

const useStyles = makeStyles({
  root: {
    border: `1px solid ${colors.greyBorder}`,
    backgroundColor: '#fff',
    // boxSizing: 'border-box',
    // textAlign: 'center',
    // '&$enabled': {
    //   borderRadius: '20px',
    // }
  },
  enabled: {
    border: `1px solid ${colors.primaryBlue}`,
    backgroundColor: colors.backgroundEnabled
  }
});

// const styles = {
//   card: {
//     minWidth: 175
//   }
//   // bullet: {
//   //   display: 'inline-block',
//   //   margin: '0 2px',
//   //   transform: 'scale(0.8)',
//   // },
//   // title: {
//   //   fontSize: 14,
//   // },
//   // pos: {
//   //   marginBottom: 12,
//   // },
// };

export const PluginComponent = ({
  state,
  actions,
  id
}: PluginComponentParams) => {
  const plugin = new Selectors(state).getPlugin(id);
  const classes = useStyles();
  return (
    <Card variant={'outlined'} square classes={{ root: plugin.enabled ? classes.enabled : classes.root }}>
      <CardContent>
        <SvgIcon component={Icons[plugin.id]} />
        <Typography variant={'h3'} component={'h3'}>{plugin.title}</Typography>
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
          />
        )}
      </CardContent>
    </Card>
  );
};
