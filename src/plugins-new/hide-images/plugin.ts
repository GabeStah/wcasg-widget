import { Plugin, PluginActionTypes } from '@/enum';
import { Ids } from 'plugins-new/data';
import styles from './styles.scss';
import { Css } from '@/utility/css';

export const pluginObject: Plugin = {
  id: Ids.HideImages,
  title: 'Hide Images',
  enabled: false,
  options: [],
  tasks: [
    {
      on: PluginActionTypes.enable,
      func: [
        () => {
          Css.addClass({
            node: document.querySelectorAll('body')[0],
            name: styles.hideImages
          });
        }
      ]
    },
    {
      on: PluginActionTypes.disable,
      func: [
        () =>
          Css.removeClass({
            node: document.querySelectorAll('body')[0],
            name: styles.hideImages
          })
      ]
    }
  ]
};

export default pluginObject;
