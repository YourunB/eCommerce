import { CategoryReference } from '@commercetools/platform-sdk';

export type ActionsProducts = {
  type:
    | 'change-category'
    | 'click-product'
    | 'change-limit'
    | 'change-price-filter'
    | 'change-offset'
    | 'change-sort'
    | 'search'
    | 'reset-btn'
    | 'change-annual'
    | 'change-perennial';
  payload: {
    prop1: string;
    prop2: string;
  };
};

export type DispatchProducts = {
  (action: ActionsProducts): void;
};

export type MappedCategories = {
  name: string;
  id: string;
  parent: CategoryReference | undefined;
  subcategory: MappedCategories[];
};
export type MappedProducts = {
  url: string;
  description: string;
  name: string;
  id: string;
  centAmount: string;
  currencyCode: string;
  photo: string;
  discount?: {
    centAmount: string;
    percent: string;
  };
};
export type FilterRules = (url: URL, value: string) => URL;
export type ResetButtonNames = 'category' | 'price' | 'search' | 'annual' | 'perennial';
