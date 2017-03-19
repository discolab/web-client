import React from 'react';

import Link from 'components/link';
import { connect } from 'react-redux';
import { setFilter } from 'data/current-filter';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.currentFilter
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => dispatch(setFilter(ownProps.filter))
  };
};

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default FilterLink;

