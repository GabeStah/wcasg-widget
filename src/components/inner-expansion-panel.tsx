/* tslint:disable:object-literal-key-quotes */
import { colors } from '@/theme/palette';
import { slugify } from '@/utility/string';
import { SvgIcon } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// @ts-ignore
import { ReactComponent as ChevronThinUp } from 'assets/svg-minified/accessibility-icons/chevron-thin-up.svg';
import React from 'react';
import { Connector } from 'state/redux/connectors';
import { State } from 'state/redux/state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expansionPanelSummaryRoot: {
      borderBottom: `1px solid ${colors.primaryBlue}`
    },
    expandIconSvg: {
      fill: colors.primaryBlue
    },
    expansionPanelSummaryExpanded: {
      // Styles for inner wrapper, while expanded
    },
    gridRoot: {
      padding: '8px 0px 0px 0px'
    },
    headerTypography: {
      color: colors.primaryBlue
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20
    }
  })
);

let isExpanded = true;

const Component = ({
  state,
  actions,
  theme,
  title,
  children
}: {
  theme?: Theme;
  state: State;
  actions: typeof Connector.__actions;
  title: string;
  children?: any;
}) => {
  const classes = useStyles(theme);

  const handleKeyDown = (e: any) => {
    if (e && e.key === 'Space') {
      console.log(`space for ${'asd'}`);
      isExpanded = !isExpanded;
    }
  };

  return (
    <ExpansionPanel
      expanded={isExpanded}
      defaultExpanded={isExpanded}
      elevation={0}
      square={false}
      classes={{ expanded: classes.expansionPanelSummaryExpanded }}
    >
      <ExpansionPanelSummary
        classes={{
          root: classes.expansionPanelSummaryRoot
        }}
        expandIcon={
          <SvgIcon
            aria-label={`${isExpanded ? 'Close' : 'Open'} ${title}`}
            className={classes.expandIconSvg}
            component={ChevronThinUp}
            onKeyDown={handleKeyDown}
          />
        }
        aria-controls={`${slugify(title)}-options-content`}
        aria-label={title}
        id={`${slugify(title)}-options-summary`}
      >
        <Typography variant={'h2'} className={classes.headerTypography}>
          {title}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.gridRoot}>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Component;
