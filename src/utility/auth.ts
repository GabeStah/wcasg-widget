import jwt from 'jsonwebtoken';

export const Auth = {
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
    return jwt.sign(payload, privateKey, options);
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
