import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import styles from './styles.scss';

export const pluginEmphasizeTitles = new PluginElementToggleable({
  id: 'plugin-emphasize-titles',
  title: 'Emphasize Titles',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'emphasize-titles-action',
      klass: [styles.emphasizeTitles]
    })
  ]
});
