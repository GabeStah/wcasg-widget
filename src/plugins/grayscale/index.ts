import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import styles from './styles.scss';

export const pluginGrayscale = new PluginElementToggleable({
  id: 'plugin-grayscale',
  title: 'Grayscale',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'grayscale-action',
      klass: [styles.grayscale],
      query: 'html'
    })
  ]
});
