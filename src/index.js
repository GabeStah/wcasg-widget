import Widget from './components/modal';
import { h, render } from 'preact';
import $ from 'cash-dom';
import config from '../config';

$('html').append(`<div id="${config.widgetId}"></div>`);
const main = document.getElementById(config.widgetId);

render(h(Widget), main);
