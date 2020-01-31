import { Plugin, PluginActionTypes } from '@/enum';
import { Ids } from 'plugins-new/data';
import styles from './styles.scss';
import { Css } from '@/utility/css';

const queryString = ['.btn', '.button', 'a', 'span', 'li', 'button'].join(', ');

const addClassAndStyle = () => {
  Css.addClass({
    node: document.querySelectorAll(queryString),
    name: styles.blackAndYellow
  });
};

const removeClassAndStyle = () => {
  Css.removeClass({
    node: document.querySelectorAll(queryString),
    name: styles.blackAndYellow
  });
};

export const pluginObject: Plugin = {
  id: Ids.BlackAndYellow,
  title: 'Black and Yellow',
  enabled: false,
  options: [],
  tasks: [
    {
      on: PluginActionTypes.enable,
      func: [addClassAndStyle]
    },
    {
      on: PluginActionTypes.disable,
      func: [removeClassAndStyle]
    }
  ]
};

export default pluginObject;
