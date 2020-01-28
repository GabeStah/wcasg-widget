import { ValueManipulationType } from 'classes/plugin/action';
import { PluginActionProperty } from 'classes/plugin/action/property';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';

export const pluginMuteAudio = new PluginElementToggleable({
  id: 'plugin-mute-audio',
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
    // new PluginActionFunction({
    //   name: 'mute-audio-popups-action',
    //   data: {
    //     focusedNodeIndex: undefined
    //   },
    //   funcOnDisable: [
    //     (self: PluginActionFunction) => {
    //       // Remove active focus
    //       Utility.Aria.blurNode({
    //         node: self.nodeList[self.data.focusedNodeIndex]
    //       });
    //       self.data.focusedNodeIndex = undefined;
    //     }
    //   ],
    //   onInitialize: (self: PluginActionFunction) => {
    //     // Add event listener one time.
    //     document.addEventListener('keydown', e =>
    //       handleKeyDown(e, self, pluginKeyboardNavigation)
    //     );
    //   },
    //   query: tags.join(', ')
    // })
  ]
});
