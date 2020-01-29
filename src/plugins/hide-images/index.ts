import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import styles from './styles.scss';

export const pluginHideImages = new PluginElementToggleable({
  id: 'plugin-hide-images',
  title: 'Hide Images',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'hide-images-action',
      klass: [styles.hideImages]
    })
  ]
});