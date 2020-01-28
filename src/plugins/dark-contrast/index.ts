import { ValueManipulationType } from 'classes/plugin/action';
import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginActionStyle } from 'classes/plugin/action/style';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import styles from './styles.scss';

export const pluginDarkContrast = new PluginElementToggleable({
  id: 'plugin-dark-contrast',
  title: 'Dark Contrast',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'dark-contrast-action-style',
      klass: [styles.darkContrast],
      query: 'html'
    }),
    new PluginActionStyle({
      name: 'dark-contrast-action-background-image',
      style: {
        name: 'background-image',
        manipulationType: ValueManipulationType.Toggle,
        // Value assigned to property when action is enabled.
        enabledValue: 'none'
      },
      query: ['.btn', '.button', 'a', 'span', 'li', 'button'].join(', ')
    })
  ]
});
