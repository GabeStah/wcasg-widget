import { Plugin, PluginActionTypes } from '@/enum';
import {
  IGoogleCloudVoice,
  IGoogleCloudVoiceSelectionParams,
  GoogleCloudVoiceSsmlVoiceGender,
  IGoogleCloudAudioConfig
} from 'services/google-cloud/text-to-speech/declarations';
import PluginManager from 'classes/plugin/manager';
import {
  GOOGLE_CLOUD_DEFAULT_AUDIO_CONFIG,
  GOOGLE_CLOUD_DEFAULT_VOICE
} from 'services/google-cloud/text-to-speech/defaults';

type FunctionType = (params?: any) => any;

export interface IPluginAction {
  id?: string;
  name?: string;
  query?: string;
  on: PluginActionTypes;
  func?: FunctionType[];
}

interface IStateServices {
  services: {
    googleCloud: {
      textToSpeech: {
        activeVoice: IGoogleCloudVoiceSelectionParams;
        audioConfig: IGoogleCloudAudioConfig;
        voices: IGoogleCloudVoice[];
      };
    };
  };
}

export interface State extends IStateServices {
  isExpanded: boolean;
  focusedNode: any;
  keyboard: {
    enabled: boolean;
    pressedKeys: any;
  };
  plugins: Plugin[];
}

export const defaultState: State = {
  isExpanded: false,
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
        audioConfig: GOOGLE_CLOUD_DEFAULT_AUDIO_CONFIG,
        voices: []
      }
    }
  }
};
