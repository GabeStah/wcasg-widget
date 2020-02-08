/* tslint:disable:object-literal-key-quotes */
import { colors } from '@/theme/palette';
import { SvgIcon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// @ts-ignore
import ChevronThinUp from 'assets/svg-minified/accessibility-icons/chevron-thin-up.svg';

import LogoComponent from 'components/logo';
/**
 * Plugin Sets
 */
import NavigationPluginSet from 'components/plugin-sets/navigation';
import TextPluginSet from 'components/plugin-sets/text';
import VisualPluginSet from 'components/plugin-sets/visual';
import ResetButtonComponent from 'components/reset-button';
import config from 'config';

import React, { useEffect } from 'react';

import { Connector } from 'state/redux/connectors';
import { Selectors } from 'state/redux/selectors';
import { State } from 'state/redux/state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      maxHeight: '80%',
      width: 350,
      margin: 0,
      bottom: 2 * 2,
      right: 2 * 3
    },
    expansionPanelSummaryRoot: {
      backgroundColor: colors.primaryBlue,
      borderRadius: '4px'
    },
    expansionPanelSummaryExpanded: {
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px'
    },
    headerTypography: {
      color: '#fff'
    },
    gridRoot: {
      flexGrow: 1,
      maxHeight: '600px',
      overflow: 'auto',
      // Attempt to integrate scrollbar styling, but very much unsupported by most browsers.
      scrollbarColor: '#fff',
      scrollbarWidth: 'thin',
      '&:webkit-scrollbar': {
        width: '1em'
      },
      '&:webkit-scrollbar-track': {
        // webkitBoxShadow: '1em',
      },
      '&:webkit-scrollbar-thumb': {
        backgroundColor: '#fff',
        outline: `1px solid ${colors.primaryBlue}`
      }
    },
    gridCentered: {
      textAlign: 'center'
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20
    }
  })
);

const DetailedExpansionPanel = ({
  state,
  actions,
  theme
}: {
  theme?: Theme;
  state: State;
  actions: typeof Connector.__actions;
}) => {
  const classes = useStyles(theme);

  useEffect(() => {
    // One-time dispatch of enabled plugins on initial render.
    const ids = new Selectors(state).getEnabledIds();
    ids.forEach((id: string) => actions.enable(id));
  }, []);

  return (
    <div className={classes.root}>
      <ExpansionPanel
        defaultExpanded={false}
        square={false}
        classes={{ expanded: classes.expansionPanelSummaryExpanded }}
      >
        <ExpansionPanelSummary
          classes={{ root: classes.expansionPanelSummaryRoot }}
          expandIcon={<SvgIcon component={ChevronThinUp} />}
          // expandIcon={<SvgIcon component={CloseIcon} viewBox='0 0 600 476.6' />}
          aria-controls={`${config.widgetId}-content`}
          id={`${config.widgetId}-summary`}
        >
          <Typography variant={'h1'} className={classes.headerTypography}>
            {config.widgetTitle}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.gridRoot}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextPluginSet actions={actions} state={state} theme={theme} />
            </Grid>
            <Grid item xs={12}>
              <VisualPluginSet actions={actions} state={state} theme={theme} />
            </Grid>
            <Grid item xs={12}>
              <NavigationPluginSet
                actions={actions}
                state={state}
                theme={theme}
              />
            </Grid>
            <Grid item xs={12}>
              <ResetButtonComponent
                actions={actions}
                state={state}
                theme={theme}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridCentered}>
              <LogoComponent theme={theme} />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size='small'>Link #1</Button>
          <Button size='small'>Link #2</Button>
          <Button size='small'>Link #3</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
};

export default DetailedExpansionPanel;
