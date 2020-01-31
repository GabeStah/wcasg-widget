import { Plugin, PluginActionTypes } from '@/enum';
import { Ids } from 'plugins/data';

function* onEnable() {}

export const pluginObject: Plugin = {
  id: Ids.VirtualKeyboard,
  title: 'Virtual Keyboard',
  enabled: false,
  customComponent: true,
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
