import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Widget from 'components/widget';

import { reducerInitializedStore } from '@/state';

import styles from 'styles/global.scss';
import config from 'config';

// Create modal div to contain widget and append to html doc
const modal = document.createElement(`div`);
modal.setAttribute('id', config.widgetId);
modal.className = `${styles.widgetContainer}`;

document.getElementsByTagName('html')[0].append(modal);

ReactDOM.render(
  <Provider store={reducerInitializedStore}>
    <Widget />
  </Provider>,
  modal
);
