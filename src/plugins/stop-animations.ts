import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import pluginStyles from 'styles/plugin-styles.scss';

export const pluginStopAnimations = new PluginElementToggleable({
  title: 'Stop CSS Animations',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'stop-css-animations-action',
      klass: [pluginStyles.stopGlobalAnimations],
      query: 'body'
    })
  ]
});
