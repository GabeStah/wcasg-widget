import {
  GoogleCloudAudioEncoding,
  GoogleCloudVoiceAudioProfile,
  GoogleCloudVoiceSsmlVoiceGender,
  IGoogleCloudAudioConfig,
  IGoogleCloudVoiceSelectionParams
} from 'services/google-cloud/text-to-speech/declarations';

/**
 * @see https://cloud.google.com/text-to-speech/docs/reference/rest/v1/text/synthesize#VoiceSelectionParams
 * @type {{ssmlGender: GoogleCloudVoiceSsmlVoiceGender; name: string; languageCode: string}}
 */
export const GOOGLE_CLOUD_DEFAULT_VOICE: IGoogleCloudVoiceSelectionParams = {
  languageCode: 'en-US',
  name: 'en-US-Wavenet-D',
  ssmlGender: GoogleCloudVoiceSsmlVoiceGender.FEMALE
};

/**
 * @see https://cloud.google.com/text-to-speech/docs/reference/rest/v1/text/synthesize#AudioConfig
 * @type {{sampleRateHertz: number; volumeGainDb: number; speakingRate: number; audioEncoding: GoogleCloudAudioEncoding; pitch: number; effectsProfileId: GoogleCloudVoiceAudioProfile.HANDSET_CLASS_DEVICE[]}}
 */
export const GOOGLE_CLOUD_DEFAULT_AUDIO_CONFIG: IGoogleCloudAudioConfig = {
  audioEncoding: GoogleCloudAudioEncoding.LINEAR16,
  speakingRate: 1,
  pitch: 0,
  sampleRateHertz: 24000,
  volumeGainDb: 0,
  effectsProfileId: [GoogleCloudVoiceAudioProfile.HANDSET_CLASS_DEVICE]
};
