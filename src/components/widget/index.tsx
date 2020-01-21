import React from 'react';
import config from 'config';

import TextNodeType from 'classes/node-types/TextNodeType';
import Scalable, { IScalable } from 'plugins/scalable';
import ScalableComponent, { ScalableComponentProps } from 'components/scalable';
import PluginManager from 'classes/plugin-manager';
import initialState from 'state/initialState';

import styles from './styles.scss';
import Toggleable, { IToggleable } from 'plugins/toggleable';
import ToggleableComponent, {
  ToggleableComponentProps
} from 'components/toggleable';
import { DOMManipulationType } from '@/plugins';
import utilities from '@/utilities';

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
  displayValue: (self: IScalable, props: ScalableComponentProps): string => {
    if (!self) {
      return '';
    }
    const { current } = props;
    return (parseFloat(String(current)) * 100).toFixed(0) + '%';
  },
  onUpdate: (self: IScalable, props: ScalableComponentProps): void => {
    if (!self) {
      return;
    }
    const { current } = props;

    if (self.nodes && self.nodes.length > 0) {
      self.nodes.forEach(node => {
        // @ts-ignore
        const original = node.getAttribute(self.dataAttributeName);
        // Set font size based on current % of original
        // @ts-ignore
        node.style.setProperty(
          self.propertyName,
          `${parseInt(original, 10) * current}${self.propertyUnit}`
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
  displayValue: (self: IScalable, props: ScalableComponentProps): string => {
    if (!self) {
      return '';
    }
    return `${props.current}${self.propertyUnit}`;
  },
  onUpdate: (self: IScalable, props: ScalableComponentProps): void => {
    if (!self) {
      return;
    }

    const { current } = props;

    if (self.nodes && self.nodes.length > 0) {
      self.nodes.forEach(node => {
        // @ts-ignore
        let original = node.getAttribute(self.dataAttributeName);
        if (isNaN(parseInt(original, 10))) {
          original = self.defaults.current;
        }
        const newValue = `${parseInt(original, 10) + current}${
          self.propertyUnit
        }`;
        // @ts-ignore
        node.style.setProperty(self.propertyName, newValue);
      });
    }
  }
});

PluginManager.add(letterSpacing);

const hightlightLinks = new Toggleable({
  id: 'highlight-links',
  title: 'Highlight Links',
  domManipulationType: DOMManipulationType.BodyClass,
  nodeTypes: new TextNodeType(),
  propertyName: '',
  propertyUnit: '',
  defaults: {
    enabled: false
  },
  displayValue: (
    self: IToggleable,
    props: ToggleableComponentProps
  ): string => {
    if (!self) {
      return '';
    }
    return `${props.enabled}${self.propertyUnit}`;
  },
  onUpdate: (self: IToggleable, props: ToggleableComponentProps): void => {
    if (!self) {
      return;
    }

    const { enabled } = props;

    if (self.domManipulationType === DOMManipulationType.BodyClass) {
      const body = utilities.getBody();
      utilities.removeClass({ node: body, className: self.style });
      if (enabled) {
        utilities.addClass({ node: body, className: self.style });
      }
    }

    // if (self.nodes && self.nodes.length > 0) {
    //   self.nodes.forEach(node => {
    //     // @ts-ignore
    //     let original = node.getAttribute(self.dataAttributeName);
    //     if (isNaN(parseInt(original, 10))) {
    //       original = self.defaults.current;
    //     }
    //     const newValue = `${parseInt(original, 10) + current}${
    //       self.propertyUnit
    //     }`;
    //     // @ts-ignore
    //     node.style.setProperty(self.propertyName, newValue);
    //   });
    // }
  }
});

PluginManager.add(hightlightLinks);

// Update initialState
initialState.plugins = PluginManager.initialState;

export default class Widget extends React.Component<{}> {
  public render() {
    return (
      <div className={styles.modal}>
        <h1>{config.widgetTitle}</h1>
        <div className={styles.modalContainer}>
          {/*<FontSize />*/}
          {/*<HightlightLinks />*/}
          <ScalableComponent id={letterSpacing.id} />
          <ScalableComponent id={fontSize.id} />
          <ToggleableComponent id={hightlightLinks.id} />
        </div>
      </div>
    );
  }
}
