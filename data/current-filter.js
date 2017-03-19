import { ALL, FAVORITES } from 'lib/filters';

/* ACTION TYPES
---------------------------------------------------------------------------- */
export const SET_FILTER = 'SET_FILTER';

/* ACTION CREATORS
---------------------------------------------------------------------------- */
export const setFilter = (filter) => {
  return {
    type: SET_FILTER,
    filter
  };
};

/* REDUCER
---------------------------------------------------------------------------- */
export default function filterReducer(currentFilter = FAVORITES, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return currentFilter;
  }
};
