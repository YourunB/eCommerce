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
