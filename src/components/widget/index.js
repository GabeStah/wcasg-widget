import { h, Component } from 'preact';
import React from 'preact/compat';
import filter from 'lodash/filter';

import FontSize from '../font-size';
import HightlightLinks from '../highlight-links';
import styles from './styles.scss';
import config from '../../../config';
import ScalablePlugin from '../prototypes/scalable';

const scalablePlugins = filter(
  config.plugins,
  plugin => plugin.type === 'scalable'
);

export default class Widget extends Component {
  render(props) {
    return (
      <div className={styles.modal}>
        <h1>{config.widgetTitle}</h1>
        <div className={styles.modalContainer}>
          <FontSize />
          <HightlightLinks />
          {scalablePlugins.map(plugin => {
            return <ScalablePlugin {...plugin} />;
          })}
        </div>
      </div>
    );
  }
}
