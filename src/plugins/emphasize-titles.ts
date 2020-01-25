import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import pluginStyles from 'styles/plugin-styles.scss';

export const pluginEmphasizeTitles = new PluginElementToggleable({
  title: 'Emphasize Titles',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'emphasize-titles-action',
      klass: [pluginStyles.emphasizeTitles]
    })
  ]
});
