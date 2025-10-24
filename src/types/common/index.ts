export type TAuthnDataRequest = {
  user_name?: string;
  email: string;
  password: string;
  password_confirm?: string;
};

export type TAuthDataResponse = {
  token: string;
  user: {
    id: string;
  };
  message: string;
  status: string;
};
