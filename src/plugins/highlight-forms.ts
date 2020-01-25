import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import pluginStyles from 'styles/plugin-styles.scss';

export const pluginHighlightForms = new PluginElementToggleable({
  title: 'Highlight Forms',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'highlight-forms-action',
      klass: [pluginStyles.highlightForms]
    })
  ]
});
