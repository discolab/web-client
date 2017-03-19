import { combineReducers } from 'redux';

/* ACTION TYPES
---------------------------------------------------------------------------- */
export const SET_ARTIST_QUERY     = 'SET_ARTIST_QUERY';
export const SET_COMPOSER_QUERY   = 'SET_COMPOSER_QUERY';
export const SET_CONDUCTOR_QUERY  = 'SET_CONDUCTOR_QUERY';
export const SET_TAG_QUERY        = 'SET_TAG_QUERY';
export const SET_YEAR_QUERY       = 'SET_YEAR_QUERY';
export const SET_LABEL_QUERY      = 'SET_LABEL_QUERY';

/* ACTION CREATORS
---------------------------------------------------------------------------- */
const makeActionCreator = (actionType) => (query) => {
  return {
    type: actionType,
    query
  };
};

export const setArtistQuery     = makeActionCreator(SET_ARTIST_QUERY);
export const setComposerQuery   = makeActionCreator(SET_COMPOSER_QUERY);
export const setConductorQuery  = makeActionCreator(SET_CONDUCTOR_QUERY);
export const setTagQuery        = makeActionCreator(SET_TAG_QUERY);
export const setYearQuery       = makeActionCreator(SET_YEAR_QUERY);
export const setLabelQuery      = makeActionCreator(SET_LABEL_QUERY);

/* REDUCER
---------------------------------------------------------------------------- */
const makeQueryReducer = (actionType) => (currentQuery = '', action) => {
  switch (action.type) {
    case actionType:
      return action.query.toLowerCase().trim();
    default:
      return currentQuery;
  }
};

const queriesReducer = combineReducers({
  artist:     makeQueryReducer(SET_ARTIST_QUERY),
  composer:   makeQueryReducer(SET_COMPOSER_QUERY),
  conductor:  makeQueryReducer(SET_CONDUCTOR_QUERY),
  tag:        makeQueryReducer(SET_TAG_QUERY),
  year:       makeQueryReducer(SET_YEAR_QUERY),
  label:      makeQueryReducer(SET_LABEL_QUERY)
});

export default queriesReducer;
