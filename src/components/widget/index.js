// @flow
import React from 'react';
// import filter from 'lodash/filter';

import config from 'config';

import TextNodeType from 'classes/node-types/TextNodeType';
import FontSize from 'components/font-size';
import HightlightLinks from 'components/highlight-links';
import Scalable from 'plugins/scalable';

import styles from './styles.scss';
import ScalableComponent from 'components/scalable';

import PluginManager from 'classes/plugin-manager';
import initialState from 'state/initialState';
import type { IScalable } from 'plugins/scalable';

const fontSize = new Scalable({
  id: 'font-size',
  title: 'Font Size',
  propertyName: 'font-size',
  propertyUnit: 'px',
  nodeTypes: new TextNodeType(),
  defaults: {
    increment: 0.1,
    minimum: 0.5,
    maximum: 3.0,
    current: 1.0
  },
  displayValue: (self: IScalable, props: any): string => {
    if (!self) return '';
    const { current } = props;
    return (parseFloat(current) * 100).toFixed(0) + '%';
  },
  onUpdate: (self: IScalable, props: any): void => {
    if (!self) return;
    const { current } = props;

    if (self.nodes && self.nodes.length > 0) {
      self.nodes.forEach(node => {
        const original = node.getAttribute(self.dataAttributeName);
        // Set font size based on current % of original
        node.style.setProperty(
          self.propertyName,
          `${parseInt(original) * current}${self.propertyUnit}`
        );
      });
    }
  }
});

PluginManager.add(fontSize);

const letterSpacing = new Scalable({
  id: 'letter-spacing',
  title: 'Scale Letter Spacing',
  propertyName: 'letter-spacing',
  propertyUnit: 'px',
  nodeTypes: new TextNodeType(),
  defaults: {
    increment: 1,
    minimum: -10,
    maximum: 20,
    current: 0
  },
  displayValue: (self: IScalable, props: any): string => {
    if (!self) return '';
    return `${props.current}${self.propertyUnit}`;
  },
  onUpdate: (self: IScalable, props: any): void => {
    if (!self) return;
    const { current } = props;

    if (self.nodes && self.nodes.length > 0) {
      self.nodes.forEach(node => {
        let original = node.getAttribute(self.dataAttributeName);
        if (isNaN(parseInt(original))) {
          original = self.defaults.current;
        }
        const newValue = `${parseInt(original) + current}${self.propertyUnit}`;
        node.style.setProperty(self.propertyName, newValue);
      });
    }
  }
});

PluginManager.add(letterSpacing);

// Update initialState
initialState.plugins = PluginManager.initialState;

export default class Widget extends React.Component<{}> {
  render() {
    return (
      <div className={styles.modal}>
        <h1>{config.widgetTitle}</h1>
        <div className={styles.modalContainer}>
          {/*<FontSize />*/}
          <HightlightLinks />
          <ScalableComponent id={letterSpacing.id} />
          <ScalableComponent id={fontSize.id} />
        </div>
      </div>
    );
  }
}
