import parseDiscoJson from 'lib/parse-disco-json';

/* ACTION TYPES
---------------------------------------------------------------------------- */
export const ADD_ITEMS = 'ADD_ITEMS';

/* ACTION CREATORS
---------------------------------------------------------------------------- */
export const addItems = (items) => {
  return {
    type: ADD_ITEMS,
    items: Array.isArray(items) ? items : [items]
  };
};

/* REDUCER
---------------------------------------------------------------------------- */
export default function reduceItems(items = [], action) {
  switch (action.type) {
    case ADD_ITEMS:
      return items.concat(action.items.map(parseDiscoJson));
    default:
      return items;
  }
}
