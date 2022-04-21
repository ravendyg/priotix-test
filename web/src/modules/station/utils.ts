import { titleSort } from './consts';
import { Sort } from './types';

export function getSortByTitle(title: string): Sort {
  return (titleSort as any)[title] || '';
}
