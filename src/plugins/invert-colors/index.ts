import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import styles from './styles.scss';

export const pluginInvertColors = new PluginElementToggleable({
  id: 'plugin-invert-colors',
  title: 'Invert Colors',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'invert-colors-action',
      klass: [styles.invert],
      query: 'html'
    })
  ]
});
