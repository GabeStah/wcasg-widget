import {
  Plugin,
  PluginActionTypes,
  PluginPropertyComponentTypes
} from '@/types';
import { Ids } from 'plugins/data';

let CLICKED: any;
let PREVIOUS_CLICKED: any;

/**
 * Tracks all bubbled blur events in DOM.
 */
document.addEventListener(
  'click',
  e => {
    PREVIOUS_CLICKED = undefined;
    CLICKED = undefined;
  },
  { capture: true, passive: true }
);

export const pluginObject: Plugin = {
  id: Ids.TextToSpeech,
  title: 'Text to Speech',
  enabled: false,
  optionCustom: true,
  customComponent: true,
  tasks: [
    {
      on: PluginActionTypes.enable,
      func: []
    },
    {
      on: PluginActionTypes.disable,
      func: []
    },
    {
      on: PluginActionTypes.selectPropertyOption,
      func: []
    }
  ],
  config: {
    props: [
      {
        id: 'behavior',
        componentType: PluginPropertyComponentTypes.Radio,
        enablePluginOnChange: true,
        name: 'Behavior',
        options: [
          {
            id: 'default',
            value: 'default',
            text: 'Default',
            selected: true
          },
          {
            id: 'links',
            value: 'links',
            text: 'Links'
          },
          {
            id: 'click',
            value: 'click',
            text: 'Click'
          }
        ]
      }
    ]
  }
};

export default pluginObject;
