/* ACTION TYPES
---------------------------------------------------------------------------- */
export const TOGGLE_QUEUE_VISIBILITY = 'TOGGLE_QUEUE_VISIBILITY';

/* ACTION CREATORS
---------------------------------------------------------------------------- */
export const toggleQueueVisibility = () => {
  return {
    type: TOGGLE_QUEUE_VISIBILITY
  };
};

/* REDUCER
---------------------------------------------------------------------------- */
export default function visibilityReducer(isVisible = false, action) {
  switch (action.type) {
    case TOGGLE_QUEUE_VISIBILITY:
      return !isVisible;
    default:
      return isVisible;
  }
};
