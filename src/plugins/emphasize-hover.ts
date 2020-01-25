import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import pluginStyles from 'styles/plugin-styles.scss';

export const pluginEmphasizeHover = new PluginElementToggleable({
  title: 'Emphasize Hover',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'emphasize-hover-action',
      klass: [pluginStyles.emphasizeHover]
    })
  ]
});
