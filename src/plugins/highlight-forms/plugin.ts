import { Plugin, PluginActionTypes } from '@/types';
import { PluginActionClass } from 'classes/plugin/action/class';
import { Ids } from 'plugins/data';
import styles from './styles.scss';

const actionClass = new PluginActionClass({
  name: 'highlight-forms-action',
  klass: [styles.highlightForms]
});

export const pluginObject: Plugin = {
  id: Ids.HighlightForms,
  title: 'Highlight Forms',
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
