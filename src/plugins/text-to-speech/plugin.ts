import { Plugin, PluginActionTypes } from '@/enum';
import {
  PluginPropertyOptionTypes,
  PluginPropertyTypes
} from 'classes/plugin/config';
import { Ids } from 'plugins/data';

export const pluginObject: Plugin = {
  id: Ids.TextToSpeech,
  title: 'Text to Speech',
  enabled: false,
  options: [
    {
      id: 0,
      name: 'behavior',
      text: 'All',
      value: 'all',
      selected: true
    },
    {
      id: 1,
      name: 'behavior',
      text: 'Links',
      value: 'links'
    }
  ],
  optionCustom: true,
  optionName: 'Behavior',
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
  ],
  config: {
    id: Ids.TextToSpeech,
    stateProps: [
      {
        id: 'enabled',
        key: 'value',
        type: PluginPropertyTypes.Boolean
      },
      {
        id: 'pitch',
        key: 'value',
        type: PluginPropertyTypes.Number
      },
      {
        id: 'volume',
        key: 'value',
        type: PluginPropertyTypes.Number
      },
      {
        id: 'voice',
        key: 'value',
        type: PluginPropertyTypes.String
      }
    ],
    props: [
      {
        id: 'enabled',
        optionType: PluginPropertyOptionTypes.Toggleable,
        value: false
      },
      {
        // type: number
        id: 'pitch',
        optionType: PluginPropertyOptionTypes.Scalable,
        value: 0,
        options: [
          {
            minimum: -20,
            step: 1,
            maximum: 20
          }
        ]
      },
      {
        // type: number
        id: 'volume',
        optionType: PluginPropertyOptionTypes.Scalable,
        value: 2,
        options: [
          {
            minimum: -96,
            step: 1,
            maximum: 16
          }
        ]
      },
      {
        // type: number
        id: 'rate',
        optionType: PluginPropertyOptionTypes.Scalable,
        value: 1,
        options: [
          {
            minimum: 0.25,
            step: 0.25,
            maximum: 4
          }
        ]
      },
      {
        // type: choose-one
        id: 'voice',
        optionType: PluginPropertyOptionTypes.Selectable,
        value: undefined,
        options: [
          {
            text: 'en-US-Wavenet-A',
            value: 'en-US-Wavenet-A'
          }
        ]
      }
    ]
  }
};

export default pluginObject;
