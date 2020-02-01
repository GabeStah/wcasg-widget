import { Plugin, PluginActionTypes } from '@/enum';
import PluginManager from 'classes/plugin/manager';

type FunctionType = (params?: any) => any;

export interface PluginAction {
  id?: string;
  name?: string;
  query?: string;
  on: PluginActionTypes;
  func?: FunctionType[];
}

export interface IGoogleCloudVoice {
  languageCodes: string[];
  name: string;
  ssmlGender: 'MALE' | 'FEMALE';
  naturalSampleRateHertz: number;
}

interface StateServices {
  services: {
    googleCloud: {
      textToSpeech: {
        activeVoice: IGoogleCloudVoice | undefined;
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
        activeVoice: {
          languageCodes: ['en-US'],
          name: 'en-US-Wavenet-D',
          naturalSampleRateHertz: 24000,
          ssmlGender: 'FEMALE'
        },
        voices: []
      }
    }
  }
};
