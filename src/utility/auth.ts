import { sign } from 'jsonwebtoken';
import keys from '../../credentials/wcasg-ada-app-dev-c14f778938af.json';

export const Auth = {
  GoogleCloud: {
    TextToSpeech: {
      generateAuthToken: (): string => {
        const timestamp = Math.round(new Date().getTime() / 1000);
        return Auth.signJWT({
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
      }
    }
  },
  /**
   * @see https://github.com/auth0/node-jsonwebtoken
   */
  signJWT: ({
    payload,
    privateKey,
    options
  }: {
    payload: any;
    privateKey: string;
    options: any;
  }) => {
    return sign(payload, privateKey, options);
  },
  /**
   * @returns {Promise<void>}
   */
  makeFetchRequest: async ({ options, url }: { options: any; url: string }) => {
    const response = await fetch(url, options);
    return await response.json();
  }
};

export default Auth;
