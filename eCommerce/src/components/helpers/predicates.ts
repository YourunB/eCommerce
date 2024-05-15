import { Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import { AuthResponse } from '../../modules/login/types';

export function isAuthResponse(data: unknown | AuthResponse): data is AuthResponse {
  return (data as AuthResponse).access_token !== undefined;
}

export function isCustomer(data: unknown | Customer): data is Customer {
  return (data as Customer).email !== undefined;
}

export function isCustomerSignInResult(data: unknown | CustomerSignInResult): data is CustomerSignInResult {
  return (data as CustomerSignInResult).customer !== undefined;
}
