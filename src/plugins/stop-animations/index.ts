import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import styles from './styles.scss';

export const pluginStopAnimations = new PluginElementToggleable({
  id: 'plugin-stop-animations',
  title: 'Stop Animations',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'stop-css-animations-action',
      klass: [styles.stopGlobalAnimations],
      query: 'body'
    })
  ]
});
