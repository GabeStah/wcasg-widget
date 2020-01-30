import { Plugin, PluginActionTypes } from '@/enum';
import styles from '@/plugins-new/emphasize-titles/styles.scss';
import { Css } from '@/utility/css';

export const pluginEmphasizeTitles: Plugin = {
  id: 'emphasize-titles',
  title: 'Emphasize Titles',
  enabled: false,
  options: [],
  tasks: [
    {
      on: PluginActionTypes.enable,
      func: [
        () => {
          Css.addClass({
            node: document.querySelectorAll('body')[0],
            name: styles.emphasizeTitles
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
            name: styles.emphasizeTitles
          })
      ]
    }
  ]
};
