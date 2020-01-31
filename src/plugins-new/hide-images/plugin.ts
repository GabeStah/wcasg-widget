import { Plugin, PluginActionTypes } from '@/enum';
import { PluginActionClass } from 'classes/plugin/action/class';
import { Ids } from 'plugins-new/data';
import styles from './styles.scss';

const actionClass = new PluginActionClass({
  name: 'hide-images-action',
  klass: [styles.hideImages]
});

export const pluginObject: Plugin = {
  id: Ids.HideImages,
  title: 'Hide Images',
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
