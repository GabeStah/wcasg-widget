import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import pluginStyles from 'styles/plugin-styles.scss';

export const pluginHideImages = new PluginElementToggleable({
  title: 'Hide Images',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'hide-images-action',
      klass: [pluginStyles.hideImages]
    })
  ]
});
