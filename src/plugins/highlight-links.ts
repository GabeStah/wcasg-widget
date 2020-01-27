import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import pluginStyles from 'styles/plugin-styles.scss';

export const pluginHighlightLinks = new PluginElementToggleable({
  id: 'plugin-highlight-links',
  title: 'Highlight Links',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'highlight-links-action',
      klass: [pluginStyles.highlightLinksBlock]
    })
  ]
});
