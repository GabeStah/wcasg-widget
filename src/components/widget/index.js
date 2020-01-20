// @flow
import React from 'react';
// import filter from 'lodash/filter';

import config from 'config';

import TextNodeType from 'classes/node-types/TextNodeType';
import FontSize from 'components/font-size';
import HightlightLinks from 'components/highlight-links';
import Scalable from 'plugins/scalable';

import styles from './styles.scss';

// const scalablePlugins = filter(
//   config.plugins,
//   plugin => plugin.type === 'scalable'
// );

const letterSpacing = new Scalable({
  id: 'letter-spacing',
  title: 'Scale Letter Spacing',
  propertyName: 'letter-spacing',
  propertyUnit: 'px',
  type: 'scalable',
  nodeTypes: new TextNodeType(),
  defaults: {
    increment: 0.1,
    minimum: 0.5,
    maximum: 3.0,
    adjustment: 1.0
  }
});

export default class Widget extends React.Component {
  render(props) {
    return (
      <div className={styles.modal}>
        <h1>{config.widgetTitle}</h1>
        <div className={styles.modalContainer}>
          <FontSize />
          <HightlightLinks />
          {letterSpacing.component}
        </div>
      </div>
    );
  }
}
