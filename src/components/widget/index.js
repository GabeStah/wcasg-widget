import { h, Component } from 'preact';
import React from 'preact/compat';
import FontSize from '../font-size';
import HightlightLinks from '../highlight-links';
import styles from './styles.scss';
import config from '../../../config';

export default class Widget extends Component {
  render(props) {
    return (
      <div className={styles.modal}>
        <h1>{config.widgetTitle}</h1>
        <div className={styles.modalContainer}>
          <FontSize />
          <HightlightLinks />
        </div>
      </div>
    );
  }
}
