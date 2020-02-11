import config from 'config';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { Connector } from 'state/redux/connectors';
import { State } from 'state/redux/state';
import { createPluginStore } from 'state/redux/store';
import theme from '@/theme';
import './load-plugins';

import DetailedExpansionPanel from 'components/detailedExpansionPanel';

if (config.debug) {
  console.warn('--- DEBUG ENABLED ---');
}

// Create modal div to contain widget and append to html doc
const app = document.createElement(`div`);
app.setAttribute('id', config.widgetId);
app.setAttribute('class', config.widgetId);

document.getElementsByTagName('html')[0].append(app);

ReactDOM.render(
  <Provider store={createPluginStore()}>
    <ThemeProvider theme={theme}>
      <Connector>
        {(state: State, actions: typeof Connector.__actions) => (
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
