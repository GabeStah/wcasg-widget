import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import pluginStyles from 'styles/plugin-styles.scss';

export const pluginLargeCursor = new PluginElementToggleable({
  title: 'Large Cursor (TODO: SVG troubles)',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'large-cursor-action',
      klass: [pluginStyles.largeCursor]
    })
  ]
});
