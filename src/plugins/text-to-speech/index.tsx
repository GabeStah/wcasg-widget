// import { Plugins } from '@/state';
import Utility from '@/utility';
import { PluginActionFunction } from 'classes/plugin/action/function';
import { IPluginElement } from 'classes/plugin/element';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import config, { TextToSpeechEngine } from 'config';
import React from 'react';
// import googleCloudTextToSpeech from '@google-cloud/text-to-speech';
// import { google } from 'root/node_modules/@google-cloud/text-to-speech/build/protos/protos';
// import SsmlVoiceGender = google.cloud.texttospeech.v1beta1.SsmlVoiceGender;

const textTags = ['p', 'span', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
// const image = ['IMAGE', 'IMG'];
// const listAndMenu = ['UL', 'OL', 'DL', 'MENU'];
// const listAndMenuItems = ['LI', 'DT', 'DD'];
// const menuItems = ['MENUITEM'];
// const elements = [
//   'ADDRESS',
//   'ARTICLE',
//   'ASIDE',
//   'FOOTER',
//   'HEADER',
//   'HGROUP',
//   'MAIN',
//   'NAV',
//   'SECTION'
// ];
// const headings = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
const tags = [...textTags];

const synthesizeSpeech = async ({
  text,
  plugin,
  engine = config.textToSpeechEngine
}: {
  text: string;
  plugin: PluginActionFunction;
  engine?: TextToSpeechEngine;
}) => {
  if (engine === TextToSpeechEngine.Browser) {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = window.speechSynthesis.getVoices()[0];
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);
  } else if (engine === TextToSpeechEngine.GoogleCloud) {
    try {
      Utility.Audio.synthesizeSpeechFromText({
        text
      }).then(response => {
        if (response && response.audioContent) {
          if (plugin.data.audio) {
            plugin.data.audio.pause();
          }
          plugin.data.audio = Utility.Audio.createHTMLAudioElement({
            content: response.audioContent
          });
          if (plugin.data.audio) {
            return plugin.data.audio.play();
          }
        } else {
          console.log(`No valid response returned.`);
        }
      });
    } catch (error) {
      Utility.throwError(error);
    }
  }
};

const changeFocus = ({
  plugin,
  isReverse = false
}: {
  plugin: PluginActionFunction;
  isReverse?: boolean;
}) => {
  let matchIndex;

  if (plugin.data.focusedNodeIndex === undefined) {
    matchIndex = 0;
  } else {
    const maxIndex = plugin.nodeList.length - 1;
    if (!isReverse) {
      matchIndex =
        plugin.data.focusedNodeIndex + 1 > maxIndex
          ? 0
          : plugin.data.focusedNodeIndex + 1;
    } else {
      matchIndex =
        plugin.data.focusedNodeIndex - 1 < 0
          ? maxIndex
          : plugin.data.focusedNodeIndex - 1;
    }

    // if (isReverse) {
    //   matchIndex =
    //     plugin.data.focusedNodeIndex && plugin.data.focusedNodeIndex - 1 > 0
    //       ? plugin.data.focusedNodeIndex - 1
    //       : plugin.nodeList.length - 1;
    // } else {
    //   matchIndex =
    //     plugin.data.focusedNodeIndex &&
    //     plugin.data.focusedNodeIndex + 1 < plugin.nodeList.length
    //       ? plugin.data.focusedNodeIndex + 1
    //       : 0;
    // }
  }

  // Either no match or only match already focused.
  if (matchIndex === -1 || matchIndex === plugin.data.focusedNodeIndex) {
    // No match, do nothing
    return;
  }

  // Match found
  const focusedNode: any = plugin.data.focusedNodeIndex
    ? plugin.nodeList[plugin.data.focusedNodeIndex]
    : undefined;
  if (focusedNode) {
    // Blur existing node
    Utility.Aria.blurNode({ node: focusedNode });
  }
  plugin.data.focusedNodeIndex = matchIndex;
  const newFocusedNode = plugin.nodeList[plugin.data.focusedNodeIndex];

  synthesizeSpeech({
    text: Utility.Aria.getElementText({ element: newFocusedNode }),
    plugin
  });

  // Focus new node
  Utility.Aria.focusNode({ node: newFocusedNode });
};

const handleKeyDown = (
  e: any,
  plugin: PluginActionFunction,
  element: IPluginElement
) => {
  if (!element.enabled) {
    return;
  }
  // Ensure no unexpected modifiers
  if (e.ctrlKey || e.shiftKey || e.altKey) {
    return;
  }

  switch (e.key) {
    case 'ArrowLeft':
      // Halt any active speech
      if (config.textToSpeechEngine === TextToSpeechEngine.Browser) {
        window.speechSynthesis.cancel();
      } else if (config.textToSpeechEngine === TextToSpeechEngine.GoogleCloud) {
        if (plugin.data.audio) {
          plugin.data.audio.pause();
        }
      }
      e.stopImmediatePropagation();
      e.preventDefault();
      changeFocus({ plugin, isReverse: true });
      break;
    case 'ArrowRight':
      // Halt any active speech
      if (config.textToSpeechEngine === TextToSpeechEngine.Browser) {
        window.speechSynthesis.cancel();
      } else if (config.textToSpeechEngine === TextToSpeechEngine.GoogleCloud) {
        if (plugin.data.audio) {
          plugin.data.audio.pause();
        }
      }
      e.stopImmediatePropagation();
      e.preventDefault();
      changeFocus({ plugin, isReverse: false });
      break;
    default:
      return;
  }
};

/**
 * Text-to-speech plugin.
 *
 * @see https://cloud.google.com/text-to-speech/pricing#pricing_table
 * @see https://cloud.google.com/text-to-speech/docs/quickstart-client-libraries?authuser=4
 * @type {PluginElementToggleable}
 */
export const pluginTextToSpeech = new PluginElementToggleable({
  id: 'plugin-text-to-speech',
  title: 'Text-to-Speech',
  enabled: false,
  actions: [
    new PluginActionFunction({
      name: 'text-to-speech-action',
      data: {
        focusedNodeIndex: undefined,
        audio: undefined
      },
      initialize: (self: PluginActionFunction) => {
        // Check for browser compatibility
        if (config.textToSpeechEngine === TextToSpeechEngine.Browser) {
          if (!window.speechSynthesis) {
            console.error(`Incompatible browser, no voice synthesizer found.`);
          } else {
            // Add event listener one time.
            document.addEventListener('keydown', e =>
              handleKeyDown(e, self, pluginTextToSpeech)
            );
          }
        } else if (
          config.textToSpeechEngine === TextToSpeechEngine.GoogleCloud
        ) {
          // Add event listener one time.
          document.addEventListener('keydown', e =>
            handleKeyDown(e, self, pluginTextToSpeech)
          );
        }
      },
      funcOnDisable: [
        (self: PluginActionFunction) => {
          // Stop speech
          window.speechSynthesis.cancel();
          if (self.data.audio) {
            self.data.audio.pause();
          }
          // Remove active focus
          Utility.Aria.blurNode({
            node: self.nodeList[self.data.focusedNodeIndex]
          });
          self.data.focusedNodeIndex = undefined;
        }
      ],

      query: tags.join(', ')
    })
  ]
});
