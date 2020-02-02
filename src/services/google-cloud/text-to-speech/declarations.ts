export enum IGoogleCloudVoiceSsmlVoiceGender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  NEUTRAL = 'NEUTRAL',
  SSML_VOICE_GENDER_UNSPECIFIED = 'SSML_VOICE_GENDER_UNSPECIFIED'
}

export const GOOGLE_CLOUD_DEFAULT_VOICE: IGoogleCloudVoiceSelectionParams = {
  languageCode: 'en-US',
  name: 'en-US-Wavenet-D',
  ssmlGender: IGoogleCloudVoiceSsmlVoiceGender.FEMALE
};

export interface IGoogleCloudVoiceSelectionParams {
  languageCode: string;
  name: string;
  ssmlGender: IGoogleCloudVoiceSsmlVoiceGender;
}

export interface IGoogleCloudVoice {
  languageCodes: string | string[];
  name: string;
  ssmlGender: IGoogleCloudVoiceSsmlVoiceGender;
  naturalSampleRateHertz: number;
}
