import { Plugin, PluginActionTypes } from '@/enum';
import { PluginActionClass } from 'classes/plugin/action/class';
import { Ids } from 'plugins/data';
import styles from './styles.scss';

export const actionClass = new PluginActionClass({
  name: 'invert-colors-action',
  klass: [styles.invert],
  query: 'html'
});

export const pluginObject: Plugin = {
  id: Ids.InvertColors,
  title: 'Invert Colors',
  enabled: false,
  options: [],
  tasks: [
    {
      on: PluginActionTypes.enable,
      func: [() => actionClass.enable()]
    },
    {
      on: PluginActionTypes.disable,
      func: [() => actionClass.disable()]
    }
  ]
};

export default pluginObject;
