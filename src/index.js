import { h, render } from 'preact';

import config from '../config';
import styles from './styles/global.css';
import Widget from './components/widget';

// Create modal div to contain widget
const modal = document.createElement(`div`);
modal.setAttribute('id', config.widgetId);
modal.className = `${styles.widgetContainer}`;

document.getElementsByTagName('html')[0].append(modal);

render(h(Widget), modal);
