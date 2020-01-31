import { WidgetNew } from 'components/widget';
import config from 'config';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Connector } from 'state/redux/connectors';
import { createPluginStore } from 'state/redux/store';
import styles from 'styles/global.scss';

if (config.debug) {
  console.warn('--- DEBUG ENABLED ---');
  // document.querySelectorAll('a[class="btn btn-sm"]')[0].id = 'test';
}

// Create modal div to contain widget and append to html doc
const modal = document.createElement(`div`);
modal.setAttribute('id', config.widgetId);
modal.className = `${styles['wcasg-ada-app-container']}`;

document.getElementsByTagName('html')[0].append(modal);

ReactDOM.render(
  <Provider store={createPluginStore()}>
    <Connector>
      {(state, actions) => <WidgetNew state={state} actions={actions} />}
    </Connector>
  </Provider>,
  modal
);
