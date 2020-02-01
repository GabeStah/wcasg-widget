import Auth from '@/utility/auth';
import Utility from '@/utility/index';
import config from 'config';
import { put, select } from 'redux-saga/effects';
import { ActionCreators } from 'state/redux/actions';
import { Selectors } from 'state/redux/selectors';

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
  const voices = yield Auth.makeFetchRequest({
    url: `https://texttospeech.googleapis.com/v1/voices?languageCode=${params.languageCode}`,
    options: {
      method: 'GET',
      // body: JSON.stringify({
      //   audioConfig: {
      //     audioEncoding: 'LINEAR16',
      //     pitch: 0,
      //     speakingRate: 1
      //   },
      //   input: {
      //     text
      //   },
      //   voice: {
      //     languageCode: 'en-US',
      //     name: 'en-US-Wavenet-D'
      //   }
      // }),
      headers: {
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        Authorization: `Bearer ${Auth.GoogleCloud.TextToSpeech.generateAuthToken()}`
      }
    }
  });

  console.log(`getSpeechToTextVoices`);
  console.log(voices);

  return yield put(ActionCreators.setTextToSpeechVoices(voices));
}

/**
 * @see https://developers.google.com/identity/protocols/OAuth2ServiceAccount
 * @see https://developers.google.com/identity/protocols/OAuth2ServiceAccount#jwt-auth
 * @see https://github.com/googleapis/googleapis/blob/master/google/cloud/texttospeech/tts_v1.yaml#L7
 * @param {string} text
 */
function* synthesizeSpeechFromText({ text }: { text: string }) {
  return yield Auth.makeFetchRequest({
    url: 'https://texttospeech.googleapis.com/v1/text:synthesize',
    options: {
      method: 'POST',
      body: JSON.stringify({
        audioConfig: {
          audioEncoding: 'LINEAR16',
          pitch: 0,
          speakingRate: 1
        },
        input: {
          text
        },
        voice: {
          languageCode: 'en-US',
          name: 'en-US-Wavenet-D'
        }
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
