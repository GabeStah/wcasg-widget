import { Plugin, PluginActionTypes } from '@/enum';
import { Ids } from 'plugins/data';

export const pluginObject: Plugin = {
  id: Ids.TextToSpeech,
  title: 'Text-to-Speech',
  enabled: false,
  options: [],
  customComponent: true,
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
