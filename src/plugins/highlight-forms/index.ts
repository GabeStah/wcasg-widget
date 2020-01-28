import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import styles from './styles.scss';

export const pluginHighlightForms = new PluginElementToggleable({
  id: 'plugin-highlight-forms',
  title: 'Highlight Forms',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'highlight-forms-action',
      klass: [styles.highlightForms]
    })
  ]
});
