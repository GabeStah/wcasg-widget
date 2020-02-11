import { createStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
// @ts-ignore
import { ReactComponent as ResetIcon } from 'assets/svg-minified/plugins/reset.svg';
import React from 'react';
import { Connector } from 'state/redux/connectors';
import { State } from 'state/redux/state';
import { Plugin } from '@/enum';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#fff',
      minWidth: '200px',
      width: '100%'
    },
    startIcon: {
      fill: '#fff',
      padding: '4px'
    }
  })
);

const Component = ({
  actions,
  state,
  theme
}: {
  actions: typeof Connector.__actions;
  state: State;
  theme?: Theme;
}) => {
  const styles = useStyles(theme);

  const handleReset = () => {
    state.plugins.forEach((plugin: Plugin) => {
      if (plugin.enabled) {
        actions.disable(plugin.id);
      }
    });
    actions.reset();
  };

  return (
    <Button
      aria-label={`Reset`}
      aria-roledescription={'button'}
      classes={{ root: styles.root, startIcon: styles.startIcon }}
      color={'primary'}
      onClick={handleReset}
      role={'button'}
      startIcon={<ResetIcon />}
      variant={'contained'}
    >
      Reset All Options
    </Button>
  );
};

export default Component;
