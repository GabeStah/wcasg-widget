import { ValueManipulationType } from 'classes/plugin/action';
import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginActionStyle } from 'classes/plugin/action/style';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import lightContrastStyles from 'styles/contrast/light-contrast.scss';

export const pluginLightContrast = new PluginElementToggleable({
  title: 'Light Contrast',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'light-contrast-action-style',
      klass: [lightContrastStyles.lightContrast],
      query: 'html'
    }),
    new PluginActionStyle({
      name: 'light-contrast-action-background-image',
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
