import 'components/filter-builder.css';

import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { unique, flatten } from 'lib/array-helpers';
import filters from 'lib/filters';
import {
  setArtistQuery,
  setComposerQuery,
  setConductorQuery,
  setTagQuery,
  setYearQuery,
  setLabelQuery
} from 'data/current-queries';

const columns = [
//   Column       Action Creator     Key          Column Mapper
//-------------------------------------------------------------------------------------------
  [ 'Artists',    setArtistQuery,    'artist',    item => item.artists ],
  [ 'Composers',  setComposerQuery,  'composer',  item => item.composers ],
  [ 'Conductors', setConductorQuery, 'conductor', item => item.conductors ],
  [ 'Tags',       setTagQuery,       'tag',       item => item.tags ],
  [ 'Years',      setYearQuery,      'year',      item => item.year ],
  [ 'Labels',     setLabelQuery,     'label',     item => item.label || '' ]
];

const DEBOUNCE_CHANGE_INTERVAL = 150;

const makeChangeHandler = (dispatch, setQuery) => (e) => {
  dispatch(setQuery(e.target.value));
};

const getColumnItems = (items, columnMapper) => {
  return unique(
    flatten(
      items
        .map(columnMapper)
        .filter(Boolean)
    )
  ).sort();
};

const FilterBuilder = ({ items, dispatch, currentQueries, currentFilter }) => {
  const currentItems = items.filter(filters[currentFilter]);

  return (
    <div className="filterBuilder">
      <div className="filterBuilder--columns">
        {columns.map(([ columnName, setQuery, queryKey, columnMapper ]) => {
          const query = currentQueries[queryKey];
          const columnItems = getColumnItems(currentItems, columnMapper);

          const debouncedChangeHandler = debounce(makeChangeHandler(dispatch, setQuery), DEBOUNCE_CHANGE_INTERVAL);
          const onChange = (e) => {
            e.persist();
            debouncedChangeHandler(e);
          };

          return (
            <div className="filterBuilder--column" key={queryKey}>
              <input className="filterBuilder--search" type="search" placeholder={columnName} onChange={onChange}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default connect(state => state)(FilterBuilder)
