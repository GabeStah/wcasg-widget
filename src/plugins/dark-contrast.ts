import { ValueManipulationType } from 'classes/plugin/action';
import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginActionStyle } from 'classes/plugin/action/style';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import darkContrastStyles from 'styles/contrast/dark-contrast.scss';

export const pluginDarkContrast = new PluginElementToggleable({
  title: 'Dark Contrast',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'dark-contrast-action-style',
      klass: [darkContrastStyles.darkContrast],
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
