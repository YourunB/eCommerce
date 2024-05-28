export type ActionsProducts = {
  type:
    | 'change-category'
    | 'click-product'
    | 'change-limit'
    | 'change-price-filter'
    | 'change-offset'
    | 'change-sort'
    | 'search';
  payload: {
    prop1: string;
    prop2: string;
  };
};

export type DispatchProducts = {
  (action: ActionsProducts): void;
};

export type MappedCategories = { name: string; id: string };
export type MappedProducts = {
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
