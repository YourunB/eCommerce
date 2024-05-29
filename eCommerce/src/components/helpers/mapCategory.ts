import { Category } from '@commercetools/platform-sdk';

export function mapCategory(category: Category) {
  return { name: category.name['en-GB'], id: category.id, parent: category.parent, subcategory: [] };
}
