import {Plugin, PluginActionTypes} from '@/enum';
import {PluginActionClass} from 'classes/plugin/action/class';
import {Ids} from 'plugins-new/data';
import styles from './styles.scss';

const actionClass = new PluginActionClass({
  name: 'stop-css-animations-action',
  klass: [styles.stopGlobalAnimations],
  query: 'body'
});

export const pluginObject: Plugin = {
  id: Ids.StopAnimations,
  title: 'Stop Animations',
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
