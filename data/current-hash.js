/* ACTION TYPES
---------------------------------------------------------------------------- */
export const SET_CURRENT_HASH = 'SET_CURRENT_HASH';

/* ACTION CREATORS
---------------------------------------------------------------------------- */
export const setCurrentHash = (hash) => {
  return {
    type: SET_CURRENT_HASH,
    hash
  };
};

/* REDUCER
---------------------------------------------------------------------------- */
export default function currentHashReducer(currentHash = '', action) {
  switch (action.type) {
    case SET_CURRENT_HASH:
      return action.hash;
    default:
      return currentHash;
  }
};
