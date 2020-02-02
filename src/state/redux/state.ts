import { Plugin, PluginActionTypes } from '@/enum';
import {
  GOOGLE_CLOUD_DEFAULT_VOICE,
  IGoogleCloudVoice,
  IGoogleCloudVoiceSelectionParams,
  IGoogleCloudVoiceSsmlVoiceGender
} from 'services/google-cloud/text-to-speech/declarations';
import PluginManager from 'classes/plugin/manager';

type FunctionType = (params?: any) => any;

export interface PluginAction {
  id?: string;
  name?: string;
  query?: string;
  on: PluginActionTypes;
  func?: FunctionType[];
}

interface StateServices {
  services: {
    googleCloud: {
      textToSpeech: {
        activeVoice: IGoogleCloudVoiceSelectionParams;
        voices: IGoogleCloudVoice[];
      };
    };
  };
}

export interface State extends StateServices {
  focusedNode: any;
  keyboard: {
    enabled: boolean;
    pressedKeys: any;
  };
  plugins: Plugin[];
}

export const defaultState: State = {
  focusedNode: undefined,
  keyboard: {
    enabled: false,
    pressedKeys: {}
  },
  plugins: PluginManager.getInstance().plugins,
  services: {
    googleCloud: {
      textToSpeech: {
        activeVoice: GOOGLE_CLOUD_DEFAULT_VOICE,
        voices: []
      }
    }
  }
};
