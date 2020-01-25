import { ValueManipulationType } from 'classes/plugin/action';
import { PluginActionProperty } from 'classes/plugin/action/property';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';

export const pluginMuteAudio = new PluginElementToggleable({
  title: 'Mute Audio',
  enabled: false,
  actions: [
    new PluginActionProperty({
      name: 'mute-audio-action',
      property: {
        name: 'muted',
        manipulationType: ValueManipulationType.Direct,
        enabledValue: true,
        disabledValue: false
      },
      query: ['audio', 'video'].join(', ')
    })
  ]
});
