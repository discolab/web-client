import { hasSubstr } from 'lib/string-helpers';
import replaceDiacritics from 'lib/replace-diacritics'

const filterProp = (prop) => (query) => (item) => {
  const containsQuery = (str) => hasSubstr(replaceDiacritics(str + ''), query);

  return Array.isArray(item[prop]) ? item[prop].some(containsQuery) : containsQuery(item[prop]);
};

export const tagFilter       = filterProp('tags');
export const artistFilter    = filterProp('artists');
export const composerFilter  = filterProp('composers');
export const conductorFilter = filterProp('conductors');
export const labelFilter     = filterProp('label');
export const yearFilter      = filterProp('year');

export const combineFilters = (filters) => (item) => filters.every(filter => filter(item));

export const ALL       = 'all';
export const POP       = 'pop';
export const ROCK      = 'rock';
export const JAZZ      = 'jazz';
export const FUNK      = 'funk';
export const AMBIENT   = 'ambient';
export const CLASSICAL = 'classical';
export const FAVORITES = 'favorites';
export const FIFTEEN   = 'Y2015';
export const SIXTEEN   = 'Y2016';

export default {
  [ALL]:        () => true,
  [POP]:        tagFilter('pop'),
  [ROCK]:       tagFilter('rock'),
  [JAZZ]:       tagFilter('jazz'),
  [FUNK]:       tagFilter('funk'),
  [AMBIENT]:    tagFilter('ambient'),
  [CLASSICAL]:  tagFilter('classical'),
  [FAVORITES]:  (item) => !!item.liked,
  [FIFTEEN]:    yearFilter(2015),
  [SIXTEEN]:    yearFilter(2016)
};
