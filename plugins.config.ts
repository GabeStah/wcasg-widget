import { DOMManipulationType } from '@/plugins';
import TextNodeType from 'classes/node-types/TextNodeType';
import Scalable from 'plugins/scalable';
import { IScalable } from 'plugins/scalable/IScalable';
import { ScalableComponentProps } from 'components/scalable';
import Toggleable from 'plugins/toggleable';
import { IToggleable } from 'plugins/toggleable/IToggleable';
import { ToggleableComponentProps } from 'components/toggleable';
import Utility from '@/utility';

const plugins = [
  new Scalable({
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
  }),
  new Scalable({
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
  }),
  new Toggleable({
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
        const body = Utility.getBody();
        Utility.removeClass({ node: body, className: self.style });
        if (enabled) {
          Utility.addClass({ node: body, className: self.style });
        }
      }
    }
  })
];

export default plugins;
