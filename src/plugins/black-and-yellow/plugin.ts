import { Plugin, PluginActionTypes } from '@/enum';
import { ValueManipulationType } from 'classes/plugin/action';
import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginActionStyle } from 'classes/plugin/action/style';
import { Ids } from 'plugins/data';
import styles from './styles.scss';

const actionClass = new PluginActionClass({
  name: 'black-and-yellow-action-style',
  klass: [styles.blackAndYellow],
  query: 'html'
});

const actionStyle = new PluginActionStyle({
  name: 'black-and-yellow-action-background-image',
  style: {
    name: 'background-image',
    manipulationType: ValueManipulationType.Toggle,
    // Value assigned to property when action is enabled.
    enabledValue: 'none'
  },
  query: ['.btn', '.button', 'a', 'span', 'li', 'button'].join(', ')
});

function* onEnable() {
  actionClass.enable();
  actionStyle.enable();
}

function* onDisable() {
  actionClass.disable();
  actionStyle.disable();
}

export const pluginObject: Plugin = {
  id: Ids.BlackAndYellow,
  title: 'Black and Yellow',
  enabled: false,
  options: [],
  tasks: [
    {
      on: PluginActionTypes.enable,
      func: [onEnable]
    },
    {
      on: PluginActionTypes.disable,
      func: [onDisable]
    }
  ]
};

export default pluginObject;
