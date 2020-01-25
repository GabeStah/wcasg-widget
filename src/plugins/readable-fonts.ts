import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import pluginStyles from 'styles/plugin-styles.scss';

export const pluginReadableFonts = new PluginElementToggleable({
  title: 'Readable Fonts',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'readable-fonts-action',
      klass: [pluginStyles.readableFonts]
    })
  ]
});
