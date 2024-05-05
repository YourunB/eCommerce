import { AuthResponse } from '../types';

export function isAuthResponse(data: unknown | AuthResponse): data is AuthResponse {
  return (data as AuthResponse).access_token !== undefined;
}
