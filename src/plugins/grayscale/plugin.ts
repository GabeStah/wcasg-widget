import { Plugin, PluginActionTypes } from '@/types';
import { PluginActionClass } from 'classes/plugin/action/class';
import { Ids } from 'plugins/data';
import styles from './styles.scss';

export const actionClass = new PluginActionClass({
  name: 'grayscale-action',
  klass: [styles.grayscale],
  query: 'html'
});

export const pluginObject: Plugin = {
  id: Ids.Grayscale,
  title: 'Grayscale',
  enabled: false,
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
