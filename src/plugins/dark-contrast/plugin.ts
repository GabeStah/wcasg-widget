import { Plugin, PluginActionTypes } from '@/types';
import { ValueManipulationType } from 'classes/plugin/action';
import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginActionStyle } from 'classes/plugin/action/style';
import { Ids } from 'plugins/data';
import styles from './styles.scss';

export const actionClass = new PluginActionClass({
  name: 'dark-contrast-action-style',
  klass: [styles.darkContrast],
  query: 'html'
});
export const actionStyle = new PluginActionStyle({
  name: 'dark-contrast-action-background-image',
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
  id: Ids.DarkContrast,
  title: 'Dark Contrast',
  enabled: false,
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
