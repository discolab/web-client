import { combineReducers } from 'redux';
import items from 'data/items';
import currentHash from 'data/current-hash';
import currentFilter from 'data/current-filter';
import currentQueries from 'data/current-queries';
import queueVisibility from 'data/queue-visibility';

const appStateReducer = combineReducers({
  items,
  currentHash,
  currentFilter,
  currentQueries,
  queueVisibility
});

export default appStateReducer;
