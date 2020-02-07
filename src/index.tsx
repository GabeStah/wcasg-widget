import makeStyles from '@material-ui/core/styles/makeStyles';
import Widget from 'components/widget';
import config from 'config';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { Connector } from 'state/redux/connectors';
import { State } from 'state/redux/state';
import { createPluginStore } from 'state/redux/store';
import styles from 'styles/global.scss';
import theme from '@/theme';
import './load-plugins';

import DetailedExpansionPanel from 'components/detailedExpansionPanel';

if (config.debug) {
  console.warn('--- DEBUG ENABLED ---');
}

// const useStyles = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px'
//   }
// });

// const classes = useStyles();

// Create modal div to contain widget and append to html doc
const app = document.createElement(`div`);
app.setAttribute('id', config.widgetId);
// modal.className = `${config.widgetId} ${styles['wcasg-ada-app-container']} ${classes.root}`;

document.getElementsByTagName('html')[0].append(app);

ReactDOM.render(
  <Provider store={createPluginStore()}>
    <ThemeProvider theme={theme}>
      <Connector>
        {(state: State, actions: typeof Connector.__actions) => (
          // <Widget state={state} actions={actions} />
          <DetailedExpansionPanel
            state={state}
            actions={actions}
            theme={theme}
          />
        )}
      </Connector>
    </ThemeProvider>
  </Provider>,
  app
);
