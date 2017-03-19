import React from 'react';
import { connect } from 'react-redux';
import filters from 'lib/filters';
import {
  tagFilter,
  yearFilter,
  artistFilter,
  labelFilter,
  composerFilter,
  conductorFilter,
  combineFilters
} from 'lib/filters';
import DiscoItemsList from 'components/disco-items-list';

const getQueryFilter = (query, queryKey) => {
  if (query) {
    switch (queryKey) {
      case 'tag':
        return tagFilter(query);
      case 'year':
        return yearFilter(query);
      case 'label':
        return labelFilter(query);
      case 'artist':
        return artistFilter(query);
      case 'composer':
        return composerFilter(query);
      case 'conductor':
        return conductorFilter(query);
    }
  }

  return null;
};

const mapStateToProps = ({ currentFilter, items, currentQueries }) => {
  const currentItems = items.filter(filters[currentFilter]);

  const filters = Object.keys(currentQueries)
    .map((queryKey) => getQueryFilter(currentQueries[queryKey], queryKey))
    .filter(Boolean);

  return {
    items: filters.length ? currentItems.filter(combineFilters(filters)) : currentItems
  };
};

const VisibleDiscoItems = connect(
  mapStateToProps
)(DiscoItemsList);

export default VisibleDiscoItems;

