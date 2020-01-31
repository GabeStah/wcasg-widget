import { Plugin, PluginActionTypes } from '@/enum';
import { PluginActionClass } from 'classes/plugin/action/class';
import { Ids } from 'plugins/data';
import styles from './styles.scss';

export const pluginObject: Plugin = {
  id: Ids.PageNavigation,
  title: 'Page Navigation',
  enabled: false,
  customComponent: true,
  options: [],
  tasks: []
};

export default pluginObject;
