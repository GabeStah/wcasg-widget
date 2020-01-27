import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import pluginStyles from 'styles/plugin-styles.scss';

export const pluginLargeCursor = new PluginElementToggleable({
  id: 'plugin-large-cursor',
  title: 'Large Cursor',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'large-cursor-action',
      klass: [pluginStyles.largeCursor],
      query: 'html'
    })
  ]
});
