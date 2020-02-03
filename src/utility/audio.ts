import {
  IGoogleCloudAudioConfig,
  IGoogleCloudVoiceSelectionParams
} from 'services/google-cloud/text-to-speech/declarations';
import Auth from '@/utility/auth';
import Utility from '@/utility/index';
import config from 'config';
import { put, select } from 'redux-saga/effects';
import { ActionCreators } from 'state/redux/actions';

export const AudioUtilities = {
  createHTMLAudioElement: ({
    encoding = 'data:audio/wav;base64',
    content
  }: {
    encoding?: string;
    content: string;
  }): HTMLAudioElement | void => {
    const encoded = `${encoding}, ${content}`;
    if (config.debug) {
      console.log(
        `Audio data received: ${Utility.bytesToSize(new Blob([encoded]).size)}.`
      );
    }
    try {
      return new Audio(encoded);
    } catch (error) {
      Utility.throwError(error);
    }
  },
  getSpeechToTextVoices,
  synthesizeSpeechFromText
};

function* getSpeechToTextVoices(
  params: { languageCode?: string } = { languageCode: 'en-US' }
) {
  const result = yield Auth.makeFetchRequest({
    url: `https://texttospeech.googleapis.com/v1/voices?languageCode=${params.languageCode}`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        Authorization: `Bearer ${Auth.GoogleCloud.TextToSpeech.generateAuthToken()}`
      }
    }
  });

  return yield put(
    ActionCreators.setTextToSpeechVoices({ voices: result.voices })
  );
}

/**
 * Invoke Google Cloud Text to Speech API to synthesize passed 'text' to speech.
 *
 * @see https://developers.google.com/identity/protocols/OAuth2ServiceAccount
 * @see https://developers.google.com/identity/protocols/OAuth2ServiceAccount#jwt-auth
 * @see https://github.com/googleapis/googleapis/blob/master/google/cloud/texttospeech/tts_v1.yaml#L7
 * @param audioConfig
 * @param {string} text
 * @param voice
 */
function* synthesizeSpeechFromText({
  audioConfig = config.services.GoogleCloud.TextToSpeech.defaultAudioConfig,
  text,
  voice = config.services.GoogleCloud.TextToSpeech.defaultVoice
}: {
  audioConfig: IGoogleCloudAudioConfig;
  text: string;
  voice?: IGoogleCloudVoiceSelectionParams;
}) {
  return yield Auth.makeFetchRequest({
    url: 'https://texttospeech.googleapis.com/v1/text:synthesize',
    options: {
      method: 'POST',
      body: JSON.stringify({
        audioConfig,
        input: {
          text
        },
        voice
      }),
      headers: {
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        Authorization: `Bearer ${Auth.GoogleCloud.TextToSpeech.generateAuthToken()}`
      }
    }
  });
}

export default AudioUtilities;
