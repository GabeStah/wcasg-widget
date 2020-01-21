// React is not defined
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Widget from 'components/widget';
import store from 'state/store';

import styles from 'styles/global.scss';
import config from 'config';

// Create modal div to contain widget
const modal = document.createElement(`div`);
modal.setAttribute('id', config.widgetId);
modal.className = `${styles.widgetContainer}`;

document.getElementsByTagName('html')[0].append(modal);

ReactDOM.render(
  <Provider store={store}>
    <Widget />
  </Provider>,
  modal
);
