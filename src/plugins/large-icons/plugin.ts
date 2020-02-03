import { Plugin, PluginActionTypes } from '@/enum';
import { PluginActionClass } from 'classes/plugin/action/class';
import { Ids } from 'plugins/data';
// import styles from './styles.scss';

const actionClass = new PluginActionClass({
  name: 'large-icons-action',
  // klass: [styles.largeCursor],
  query: 'html'
});

/**
 * Tags for icons
 * button
 * i
 * svg
 * a
 * span
 */

/**
 * attributes for icons
 * <span>type</span>
 * <a>type</a>
 * *[class*="type"]
 * *[id*="type"]
 * *[data-item*="type"]
 * *[aria-label*="type"]
 */

/**
 * ::before { content: "\f030"; }
 *
 */

export const pluginObject: Plugin = {
  id: Ids.LargeIcons,
  title: 'Large Icons',
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
