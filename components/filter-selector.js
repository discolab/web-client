import React from 'react';
import filters from 'lib/filters';
import FilterLink from 'components/filter-link';
import 'components/filter-selector.css';

const FilterSelector = () => (
  <div className="filterSelector">
    {Object.keys(filters).map((filter) =>
      <div key={filter} className="filterSelector--item">
        <FilterLink filter={filter}>{filter}</FilterLink>
      </div>
    )}
  </div>
);

export default FilterSelector;

