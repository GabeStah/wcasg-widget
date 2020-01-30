import { CompressionType } from '@/utility/store';

export enum TextToSpeechEngine {
  Browser,
  GoogleCloud
}

const config = {
  debug: true,
  // Used for many internal references and names.
  // Try to ensure this is likely to be a globally unique id.
  widgetId: `wcasg-ada-app`,
  useLocalStorageCompression: true,
  // TODO: Base64 compression currently bugged.
  localCompressionType: CompressionType.LZString,
  textToSpeechEngine: TextToSpeechEngine.GoogleCloud,
  widgetTitle: 'WCASG ADA Widget'
};

export default config;
