import { Customer, CustomerSignInResult, ErrorResponse, ProductProjection } from '@commercetools/platform-sdk';
import { AuthResponse } from '../../modules/login/types';
import { MappedCategories, MappedProducts } from '../../modules/products/types';

export function isAuthResponse(data: unknown | AuthResponse): data is AuthResponse {
  return (data as AuthResponse)?.access_token !== undefined;
}

export function isCustomer(data: unknown | Customer): data is Customer {
  return (data as Customer)?.email !== undefined;
}

export function isCustomerSignInResult(data: unknown | CustomerSignInResult): data is CustomerSignInResult {
  return (data as CustomerSignInResult)?.customer !== undefined;
}

export function isErrorResponse(data: unknown | ErrorResponse): data is ErrorResponse {
  return (data as ErrorResponse)?.statusCode !== undefined;
}

export function isProductProjection(data: unknown | ProductProjection): data is ProductProjection {
  return (data as ProductProjection)?.name !== undefined && (data as ProductProjection)?.masterVariant !== undefined;
}

export function isMappedProducts(data: unknown | MappedProducts[]): data is MappedProducts[] {
  if (typeof data !== 'object') return false;
  return (data as MappedProducts[])[0]?.name !== undefined && (data as MappedProducts[])[0]?.centAmount !== undefined;
}

export function isMappedCategories(data: unknown | MappedCategories[]): data is MappedCategories[] {
  if (typeof data !== 'object') return false;
  return (data as MappedCategories[])[0]?.name !== undefined && (data as MappedCategories[])[0]?.id !== undefined;
}

export async function responseToJSON<T>(response: Response): Promise<T | ErrorResponse> {
  if (!response.ok) return response.json().then((resp) => resp as ErrorResponse);
  return response.json() as T;
}
