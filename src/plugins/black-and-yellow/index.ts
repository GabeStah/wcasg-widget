import { ValueManipulationType } from 'classes/plugin/action';
import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginActionStyle } from 'classes/plugin/action/style';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import styles from './styles.scss';

export const pluginBlackAndYellow = new PluginElementToggleable({
  id: 'plugin-black-and-yellow',
  title: 'Black & Yellow',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'black-and-yellow-action-style',
      klass: [styles.blackAndYellow],
      query: 'html'
    }),
    new PluginActionStyle({
      name: 'black-and-yellow-action-background-image',
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
