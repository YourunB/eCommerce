export type Actions = {
  type: 'login';
  payload: {
    email: string;
    password: string;
  };
};

export type Dispatch = {
  (action: Actions): void;
};

export type AuthResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
};
