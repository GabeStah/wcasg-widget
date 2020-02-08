/* tslint:disable:object-literal-key-quotes */
import { createMuiTheme } from '@material-ui/core';

import palette, { colors } from './palette';
import typography from './typography';

const theme = createMuiTheme({
  palette,
  typography,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  },
  overrides: {
    MuiButton: {
      root: {
        minWidth: '22px',
        padding: '1px'
      },
      outlined: {
        padding: '1px',
        margin: '7px'
      },
      startIcon: {
        fill: colors.primaryBlue,
        marginLeft: '0px',
        marginRight: '0px',
        textAlign: 'center'
      }
    },
    MuiCard: {
      root: {
        boxSizing: 'border-box',
        minHeight: '124px',
        textAlign: 'center'
      }
    },
    MuiCardContent: {
      root: {
        padding: '12px',
        '&:last-child': {
          paddingBottom: '12px'
        }
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        '&$expanded': {
          minHeight: 'inherit'
        }
      },
      content: {
        margin: '0px',
        '&$expanded': {
          margin: '0px'
        }
      }
    }
  },
  props: {
    // Name of the component
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true // No more ripple, on the whole application
    }
  }
});

export default theme;
