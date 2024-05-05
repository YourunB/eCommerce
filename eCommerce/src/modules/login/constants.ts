export const AUTH_BASIC = 'Basic';
export const AUTH_BEARER = 'Bearer';
export const PROJECT_KEY = 'tpepapuz';
export const GRANT_PASSWORD = 'password';
export const PATH = `/oauth/${PROJECT_KEY}/customers/token`;
export const CLIENT_ID = 'nO6SI7A_iUtziAKsP4x6AmUz';
export const CLIENT_SECRET = 'ijdMuAhQ0exPlJ-S61TMsVCgcfM_GtWc';
export const AUTH_PARAMS = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
export const CONTENT_TYPE_APP = 'application/x-www-form-urlencoded';
export const AUTH_URL = 'https://auth.eu-central-1.aws.commercetools.com';
export const API_URL = 'https://api.eu-central-1.aws.commercetools.com';
export const MSG_NETWORK_ERROR = '(network error) failed to fetch data from a server';
export const SCOPES_CLIENT = [
  'view_published_products',
  'manage_my_payments',
  'manage_my_shopping_lists',
  'manage_my_quote_requests',
  'manage_my_quotes',
  'manage_my_orders',
  'manage_my_business_units',
  'view_categories',
  'create_anonymous_token',
];
