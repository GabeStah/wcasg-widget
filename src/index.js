import { h, render } from 'preact';
import $ from 'cash-dom';

import config from '../config';
import styles from './styles/global.css';
import Widget from './components/widget';

$('html').append(
  `<div id="${config.widgetId}" class="${styles.widgetContainer}"></div>`
);

render(h(Widget), document.getElementById(config.widgetId));
