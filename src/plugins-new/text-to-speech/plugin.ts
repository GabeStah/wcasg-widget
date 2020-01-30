import { Plugin, PluginActionTypes } from '@/enum';

export const pluginTextToSpeech: Plugin = {
  id: 'text-to-speech',
  title: 'Text-to-Speech',
  enabled: false,
  options: [],
  tasks: [
    {
      on: PluginActionTypes.enable,
      func: [
        // () => {
        //   Css.addClass({
        //     node: document.querySelectorAll('body')[0],
        //     name: styles.emphasizeTitles
        //   });
        // }
      ]
    },
    {
      on: PluginActionTypes.disable,
      func: [
        // () =>
        //   Css.removeClass({
        //     node: document.querySelectorAll('body')[0],
        //     name: styles.emphasizeTitles
        //   })
      ]
    }
  ]
};
