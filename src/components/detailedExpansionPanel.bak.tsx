import { Plugin } from '@/enum';
import PluginManager from 'classes/plugin/manager';
import { PluginComponent } from 'components/plugin';
import styles from 'components/widget/styles.scss';
import config from 'config';
import PageNavigationComponent from 'plugins/page-navigation';
import PageNavigationPlugin from 'plugins/page-navigation/plugin';
import TextToSpeechComponent from 'plugins/text-to-speech';
import TextToSpeechPlugin from 'plugins/text-to-speech/plugin';
import VirtualKeyboardComponent from 'plugins/virtual-keyboard';
import VirtualKeyboardPlugin from 'plugins/virtual-keyboard/plugin';
import React, { useEffect } from 'react';
import { SvgIcon } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

// @ts-ignore
import CloseIcon from 'assets/svg-minified/accessibility-icons/close.svg';
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
    // heading: {
    //   fontSize: theme.typography.pxToRem(15)
    // },
    // secondaryHeading: {
    //   fontSize: theme.typography.pxToRem(15),
    //   color: theme.palette.text.secondary
    // },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20
    }
    // details: {
    //   alignItems: 'center'
    // },
    // column: {
    //   flexBasis: '33.33%'
    // },
    // helper: {
    //   borderLeft: `2px solid ${theme.palette.divider}`,
    //   padding: theme.spacing(1, 2)
    // },
    // link: {
    //   color: theme.palette.primary.main,
    //   textDecoration: 'none',
    //   '&:hover': {
    //     textDecoration: 'underline'
    //   }
    // }
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
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<SvgIcon component={CloseIcon} />}
          // expandIcon={<SvgIcon component={CloseIcon} viewBox='0 0 600 476.6' />}
          aria-controls='panel1c-content'
          id='panel1c-header'
        >
          {/*<div className={classes.column}>*/}
          {/*  <Typography className={classes.heading}>Location</Typography>*/}
          {/*</div>*/}
          {/*<div className={classes.column}>*/}
          {/*  <Typography className={classes.secondaryHeading}>*/}
          {/*    Select trip destination*/}
          {/*  </Typography>*/}
          {/*</div>          */}
          <div>
            <Typography>{config.widgetTitle}</Typography>
          </div>
        </ExpansionPanelSummary>
        {/*<ExpansionPanelDetails className={classes.details}>*/}
        <ExpansionPanelDetails>
          <div className={styles.modalContainer}>
            {PluginManager.getInstance().pluginsAutoGenerated.map(
              (plugin: Plugin) => (
                <PluginComponent
                  key={plugin.id}
                  state={state}
                  actions={actions}
                  id={plugin.id}
                />
              )
            )}
            <TextToSpeechComponent
              key={TextToSpeechPlugin.id}
              state={state}
              actions={actions}
              id={TextToSpeechPlugin.id}
            />
            <PageNavigationComponent
              key={PageNavigationPlugin.id}
              state={state}
              actions={actions}
              id={PageNavigationPlugin.id}
            />
            <VirtualKeyboardComponent
              key={VirtualKeyboardPlugin.id}
              state={state}
              actions={actions}
              id={VirtualKeyboardPlugin.id}
            />
          </div>
          {/*<div className={classes.column} />*/}
          {/*<div className={classes.column}>*/}
          {/*  <Chip label='Barbados' onDelete={() => {}} />*/}
          {/*</div>*/}
          {/*<div className={clsx(classes.column, classes.helper)}>*/}
          {/*  <Typography variant='caption'>*/}
          {/*    Select your destination of choice*/}
          {/*    <br />*/}
          {/*    <a href='#secondary-heading-and-columns' className={classes.link}>*/}
          {/*      Learn more*/}
          {/*    </a>*/}
          {/*  </Typography>*/}
          {/*</div>*/}
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size='small'>Cancel</Button>
          <Button size='small' color='primary'>
            Save
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
};

export default DetailedExpansionPanel;
