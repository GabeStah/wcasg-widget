import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import constrastStyles from 'styles/contrast/index.scss';

export const pluginInvertColors = new PluginElementToggleable({
  id: 'plugin-invert-colors',
  title: 'Invert Colors',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'invert-colors-action',
      klass: [constrastStyles.invert],
      query: 'html'
    })
  ]
});
