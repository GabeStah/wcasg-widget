/* tslint:disable:object-literal-key-quotes */
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
// import closeIconUrl, {
//   ReactComponent as CloseIcon
//   // @ts-ignore
// } from 'assets/svg-minified/accessibility-icons/chevron-thin-down.svg';
import chevronIconUrl, {
  ReactComponent as ChevronThinUpIcon
  // @ts-ignore
} from 'assets/svg-minified/accessibility-icons/chevron-thin-up.svg';
import DisclaimerDialog from 'components/disclaimer-dialog';
import StatementDialog from 'components/statement-dialog';

// import LogoComponent from 'components/logo';
import LogoComponent from 'components/logo-image';
/**
 * Plugin Sets
 */
import NavigationPluginSet from 'components/plugin-sets/navigation';
import TextPluginSet from 'components/plugin-sets/text';
import VisualPluginSet from 'components/plugin-sets/visual';
import ResetButtonComponent from 'components/reset-button';
import config from 'config';

import React, { useEffect } from 'react';
import { select } from 'redux-saga/effects';
import { ActionCreators } from 'state/redux/actions';
import { Connector } from 'state/redux/connectors';
import { Selectors } from 'state/redux/selectors';
import { State } from 'state/redux/state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      width: 350,
      margin: 0,
      bottom: 2 * 2,
      right: 2 * 3,
      zIndex: 9995
    },
    expanded: {},
    expandIcon: {
      color: theme.palette.text.secondary,
      fontSize: '12px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      textTransform: 'uppercase',
      // X-axis padding is inversed, due to 180degree transform (flip)
      padding: '12px 1px 12px 8px'
      // '&::before': {
      //   content: "'ESC'"
      // }
      // '&$expanded': {
      //   transform: 'rotate(0deg)'
      // }
    },
    closeIcon: {
      fill: theme.palette.text.secondary,
      height: '20px',
      width: '20px'
    },
    closeIconLarge: {
      fill: theme.palette.text.secondary
    },
    expansionPanelSummaryContent: {
      alignItems: 'center'
    },
    expansionPanelSummaryRoot: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '4px 4px 0 0',
      fill: theme.palette.text.secondary
    },
    expansionPanelSummaryExpanded: {
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
      fill: theme.palette.text.secondary
    },
    headerTypography: {
      color: theme.palette.text.secondary,
      flex: 1
    },
    gridRoot: {
      flexGrow: 1,
      maxHeight: '600px',
      overflow: 'auto',
      // Attempt to integrate scrollbar styling, but very much unsupported by most browsers.
      scrollbarColor: theme.palette.text.secondary,
      scrollbarWidth: 'thin',
      '&:webkit-scrollbar': {
        width: '1em'
      },
      '&:webkit-scrollbar-track': {
        // webkitBoxShadow: '1em',
      },
      '&:webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.text.secondary,
        outline: `1px solid ${theme.palette.primary.main}`
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
  theme: Theme;
  state: State;
  actions: typeof Connector.__actions;
}) => {
  const classes = useStyles(theme);
  const isWidgetExpanded = new Selectors(state).isWidgetExpanded();

  /**
   * Update expanded state.
   *
   * @param e
   * @param {boolean} expanded
   */
  const handleOnChange = (e: any, expanded: boolean) => {
    actions.setWidgetExpanded(expanded);
  };

  useEffect(() => {
    // One-time dispatch of enabled plugins on initial render.
    const ids = new Selectors(state).getEnabledIds();
    ids.forEach((id: string) => actions.enable(id));
  }, []);

  return (
    <div className={classes.root}>
      <ExpansionPanel
        classes={{ expanded: classes.expansionPanelSummaryExpanded }}
        defaultExpanded={false}
        expanded={isWidgetExpanded}
        onChange={handleOnChange}
        square={false}
        TransitionProps={{ unmountOnExit: true }}
      >
        <ExpansionPanelSummary
          classes={{
            root: classes.expansionPanelSummaryRoot,
            content: classes.expansionPanelSummaryContent,
            expandIcon: isWidgetExpanded ? classes.expandIcon : '',
            expanded: classes.expanded
          }}
          expandIcon={
            isWidgetExpanded ? (
              <SvgIcon
                className={classes.closeIcon}
                component={ChevronThinUpIcon}
              />
            ) : (
              <SvgIcon
                className={classes.closeIconLarge}
                component={ChevronThinUpIcon}
              />
            )
          }
          aria-controls={`${config.widgetId}-content`}
          id={`${config.widgetId}-summary`}
        >
          <Typography variant={'h1'} className={classes.headerTypography}>
            {config.widgetTitle}
          </Typography>
          {isWidgetExpanded ? (
            <Typography color={'textSecondary'}>ESC</Typography>
          ) : (
            ''
          )}
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
        <ExpansionPanelActions style={{ display: 'flex' }}>
          <StatementDialog state={state} theme={theme} type={'inline'} />
          <DisclaimerDialog state={state} theme={theme} />
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
};

export default DetailedExpansionPanel;
