import { Plugin, PluginActionTypes } from '@/enum';
import { Ids } from 'plugins-new/data';
import styles from './styles.scss';
import { Css } from '@/utility/css';

export const pluginObject: Plugin = {
  id: Ids.InvertColors,
  title: 'Invert Colors',
  enabled: false,
  options: [],
  tasks: [
    {
      on: PluginActionTypes.enable,
      func: []
    },
    {
      on: PluginActionTypes.disable,
      func: []
    }
  ]
};

export default pluginObject;
