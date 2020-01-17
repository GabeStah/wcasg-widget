import Widget from './components/modal';
import { h, render } from 'preact';
import $ from 'cash-dom';

$('html').append('<div id="wcasg-ada-app"></div>');
const main = document.getElementById('wcasg-ada-app');

render(h(Widget), main);
