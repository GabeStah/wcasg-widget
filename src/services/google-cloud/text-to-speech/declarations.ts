export enum GoogleCloudAudioEncoding {
  AUDIO_ENCODING_UNSPECIFIED = 'AUDIO_ENCODING_UNSPECIFIED',
  LINEAR16 = 'LINEAR16',
  MP3 = 'MP3',
  OGG_OPUS = 'OGG_OPUS'
}

export enum GoogleCloudVoiceSsmlVoiceGender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  NEUTRAL = 'NEUTRAL',
  SSML_VOICE_GENDER_UNSPECIFIED = 'SSML_VOICE_GENDER_UNSPECIFIED'
}

/**
 * @see https://cloud.google.com/text-to-speech/docs/audio-profiles
 */
export enum GoogleCloudVoiceAudioProfile {
  WEARABLE_CLASS_DEVICE = 'wearable-class-device',
  HANDSET_CLASS_DEVICE = 'handset-class-device',
  HEADPHONE_CLASS_DEVICE = 'headphone-class-device',
  SMALL_BLUETOOTH_SPEAKER_CLASS_DEVICE = 'small-bluetooth-speaker-class-device',
  MEDIUM_BLUETOOTH_SPEAKER_CLASS_DEVICE = 'medium-bluetooth-speaker-class-device',
  LARGE_HOME_ENTERTAINMENT_CLASS_DEVICE = 'large-home-entertainment-class-device',
  LARGE_AUTOMOTIVE_CLASS_DEVICE = 'large-automotive-class-device',
  TELEPHONY_CLASS_APPLICATION = 'telephony-class-application'
}

export interface IGoogleCloudVoiceSelectionParams {
  languageCode: string;
  name: string;
  ssmlGender: GoogleCloudVoiceSsmlVoiceGender;
}

/**
 * @see https://cloud.google.com/text-to-speech/docs/reference/rest/v1/text/synthesize#AudioConfig
 */
export interface IGoogleCloudAudioConfig {
  audioEncoding: GoogleCloudAudioEncoding;
  speakingRate: number;
  pitch: number;
  volumeGainDb: number;
  sampleRateHertz: number;
  effectsProfileId: GoogleCloudVoiceAudioProfile[];
}

export interface IGoogleCloudVoice {
  languageCodes: string | string[];
  name: string;
  ssmlGender: GoogleCloudVoiceSsmlVoiceGender;
  naturalSampleRateHertz: number;
}
