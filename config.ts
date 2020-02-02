import {
  GOOGLE_CLOUD_DEFAULT_VOICE,
  IGoogleCloudVoiceSelectionParams,
  IGoogleCloudVoiceSsmlVoiceGender
} from 'services/google-cloud/text-to-speech/declarations';

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
      TextToSpeech: { defaultVoice: IGoogleCloudVoiceSelectionParams };
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
        defaultVoice: GOOGLE_CLOUD_DEFAULT_VOICE
      }
    }
  },
  widgetTitle: 'WCASG ADA Widget'
};

export default config;
