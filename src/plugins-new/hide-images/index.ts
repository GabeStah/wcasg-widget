import { Plugin, PluginActionTypes } from '@/enum';
import { Css } from '@/utility/css';
import styles from './styles.scss';

export const pluginHideImages: Plugin = {
  id: 'hide-images',
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
