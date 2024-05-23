export type ActionsMain = {
  type: 'change-category' | 'click-product' | 'change-limit';
  payload: {
    prop1: string;
    prop2: string;
  };
};

export type DispatchMain = {
  (action: ActionsMain): void;
};

export type MappedCategories = { name: string; id: string };
export type MappedProducts = { name: string; id: string; centAmount: string; currencyCode: string; photo: string };
export type FilterRules = (url: URL, value: string) => URL;
