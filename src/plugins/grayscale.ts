import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import constrastStyles from 'styles/contrast/index.scss';

export const pluginGrayscale = new PluginElementToggleable({
  title: 'Grayscale',
  enabled: false,
  actions: [
    new PluginActionClass({
      name: 'grayscale-action',
      klass: [constrastStyles.grayscale],
      query: 'html'
    })
  ]
});
