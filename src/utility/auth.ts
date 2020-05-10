import Utility from '@/utility/index';

export const Auth = {
  /**
   * @returns {Promise<void>}
   */
  makeFetchRequest: async ({ options, url }: { options: any; url: string }) => {
    try {
      const response = await fetch(url, options);
      if (response.status === 400) {
        console.error(await response.json());
      }
      return response.json();
    } catch (error) {
      Utility.throwError(error);
    }
  }
};

export default Auth;
