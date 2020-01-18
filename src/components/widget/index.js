import { h, Component } from 'preact';
import React from 'preact/compat';
import FontSize from '../font-size';
import HightlightLinks from '../highlight-links';
import styles from './styles.scss';
import config from '../../../config';
// import ScalableComponent from '../prototypes/scalable';
import Scalables from '../prototypes/scalable/scalables';

// const letterSpacingConfig = config.plugins.letterSpacing;
//
// const LetterSpacing = new ScalableComponent();

const scalablePlugins = [];
for (const key in config.plugins) {
  if (config.plugins[key].type === 'scalable') {
    scalablePlugins.push(config.plugins[key]);
  }
}

export default class Widget extends Component {
  render(props) {
    return (
      <div className={styles.modal}>
        <h1>{config.widgetTitle}</h1>
        <div className={styles.modalContainer}>
          <FontSize />
          <HightlightLinks />
          {/*<LetterSpacing />*/}
          <Scalables props={scalablePlugins} />
        </div>
      </div>
    );
  }
}
