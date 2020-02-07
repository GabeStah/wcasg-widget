import {
  IGoogleCloudVoiceSelectionParams,
  GoogleCloudVoiceSsmlVoiceGender,
  IGoogleCloudAudioConfig
} from 'services/google-cloud/text-to-speech/declarations';
import {
  GOOGLE_CLOUD_DEFAULT_AUDIO_CONFIG,
  GOOGLE_CLOUD_DEFAULT_VOICE
} from 'services/google-cloud/text-to-speech/defaults';

export enum TextToSpeechEngine {
  Browser,
  GoogleCloud
}

enum CompressionType {
  LZString,
  Base64
}

export interface IConfig {
  debug: boolean;
  widgetId: string;
  useLocalStorageCompression: boolean;
  focusPollFrequency: number;
  localStorageDebounceDelay: number;
  localCompressionType: CompressionType;
  textToSpeechEngine: TextToSpeechEngine;
  services: {
    GoogleCloud: {
      TextToSpeech: {
        defaultAudioConfig: IGoogleCloudAudioConfig;
        defaultVoice: IGoogleCloudVoiceSelectionParams;
      };
    };
  };
  widgetTitle: string;
}

const config: IConfig = {
  debug: true,
  // Used for many internal references and names.
  // Try to ensure this is likely to be a globally unique id.
  widgetId: `wcasg-ada-app`,
  useLocalStorageCompression: true,
  // Time (in ms) between poll updates tracking new focused nodes in DOM.
  focusPollFrequency: 250,
  // Minimum number of seconds to wait between localStorage saves.
  // Delays saving to local storage during rapid user-changes.
  localStorageDebounceDelay: 3,
  // TODO: Base64 compression currently bugged.
  localCompressionType: CompressionType.LZString,
  textToSpeechEngine: TextToSpeechEngine.GoogleCloud,
  services: {
    GoogleCloud: {
      TextToSpeech: {
        defaultAudioConfig: GOOGLE_CLOUD_DEFAULT_AUDIO_CONFIG,
        defaultVoice: GOOGLE_CLOUD_DEFAULT_VOICE
      }
    }
  },
  widgetTitle: 'Accessibility Toolbar'
};

export default config;
