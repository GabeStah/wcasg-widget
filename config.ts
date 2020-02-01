export enum TextToSpeechEngine {
  Browser,
  GoogleCloud
}

enum CompressionType {
  LZString,
  Base64
}

const config = {
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
  widgetTitle: 'WCASG ADA Widget'
};

export default config;
