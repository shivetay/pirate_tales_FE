import Cookies from 'js-cookie';

export const cookieStorage = {
  get: (name: string) => Cookies.get(name),

  set: (name: string, value: string, options?: Cookies.CookieAttributes) =>
    Cookies.set(name, value, options),

  // {
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'strict',
  //     expires: 7, // 7 days
  //     ...options,
  //   }

  remove: (name: string, options?: Cookies.CookieAttributes) =>
    Cookies.remove(name, options),

  setAuthTokens: (token: string, refreshToken?: string) => {
    cookieStorage.set('auth_token', token);
    if (refreshToken) {
      cookieStorage.set('refresh_token', refreshToken);
    }
  },

  getAuthTokens: () => {
    return {
      token: cookieStorage.get('auth_token'),
      refreshToken: cookieStorage.get('refresh_token'),
    };
  },

  clearAuthTokens: () => {
    cookieStorage.remove('auth_token');
    cookieStorage.remove('refresh_token');
    cookieStorage.remove('user_data');
  },
};
