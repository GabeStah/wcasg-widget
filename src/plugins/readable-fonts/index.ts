import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import styles from './styles.scss';

export const pluginReadableFonts = new PluginElementToggleable({
  id: 'plugin-readable-fonts',
  title: 'Readable Fonts',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'readable-fonts-action',
      klass: [styles.readableFonts]
    })
  ]
});
