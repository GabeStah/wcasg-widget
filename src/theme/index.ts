/* tslint:disable:object-literal-key-quotes */
import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';

const theme = createMuiTheme({
  palette,
  typography,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  },
  overrides: {
    MuiCard: {
      root: {
        boxSizing: 'border-box',
        textAlign: 'center',
      },
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
