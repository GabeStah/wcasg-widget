import Utility from '@/utility/index';
import config from 'config';
import keys from '../../credentials/wcasg-ada-app-dev-c14f778938af.json';

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
  /**
   * @see https://developers.google.com/identity/protocols/OAuth2ServiceAccount
   * @see https://developers.google.com/identity/protocols/OAuth2ServiceAccount#jwt-auth
   * @see https://github.com/googleapis/googleapis/blob/master/google/cloud/texttospeech/tts_v1.yaml#L7
   * @param {string} text
   */
  synthesizeSpeechFromText: ({ text }: { text: string }) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const authToken = Utility.Auth.signJWT({
      payload: {
        iss: keys.client_email,
        sub: keys.client_email,
        aud: 'https://texttospeech.googleapis.com/',
        iat: timestamp,
        exp: timestamp + 3600
      },
      privateKey: keys.private_key,
      options: {
        header: {
          alg: 'RS256',
          typ: 'JWT',
          kid: keys.private_key_id
        },
        algorithm: 'RS256'
      }
    });

    return Utility.Auth.makeFetchRequest({
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
          Authorization: `Bearer ${authToken}`
        }
      }
    });
  }
};

export default AudioUtilities;
