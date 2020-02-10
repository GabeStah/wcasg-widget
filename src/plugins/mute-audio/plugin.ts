import { Plugin, PluginActionTypes } from '@/enum';
import { ValueManipulationType } from 'classes/plugin/action';
import { PluginActionProperty } from 'classes/plugin/action/property';
import { Ids } from 'plugins/data';

const actionProperty = new PluginActionProperty({
  name: 'mute-audio-action',
  property: {
    name: 'muted',
    manipulationType: ValueManipulationType.Direct,
    enabledValue: true,
    disabledValue: false
  },
  query: ['audio', 'video'].join(', ')
});

export const pluginObject: Plugin = {
  id: Ids.MuteAudio,
  title: 'Mute Sounds',
  enabled: false,
  options: [],
  tasks: [
    {
      on: PluginActionTypes.enable,
      func: [() => actionProperty.enable()]
    },
    {
      on: PluginActionTypes.disable,
      func: [() => actionProperty.disable()]
    }
  ]
};

export default pluginObject;
