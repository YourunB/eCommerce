import state, { subscribe } from '../state';

describe('state', () => {
  it('correct storage of data', () => {
    const testToken = {
      access_token: 'Lorem ipsum dolor sit amet consectetur',
      expires_in: 2219,
      token_type: 'adipisicing',
      scope: 'In officia quaerat saepe',
      refresh_token: 'dicta dignissimos architecto deserunt eveniet',
    };

    state.access_token = testToken;
    expect(state.access_token.access_token).toBe(testToken.access_token);
  });

  it('correct callback saving', () => {
    const newToken = {
      access_token: ' sit amet consectetur',
      expires_in: 22,
      token_type: 'adiping',
      scope: 'In offat saepe',
      refresh_token: 'dicchitecto deserunt eveniet',
    };
    const newExpires_in = 333;

    const testCallback = () => {
      state.access_token.expires_in = newExpires_in;
    };

    subscribe('access_token', testCallback);
    state.access_token = newToken;
    expect(state.access_token.expires_in).toBe(newExpires_in);
  });
});
