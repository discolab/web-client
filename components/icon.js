import React from 'react';
import { connect } from 'react-redux';
import { setCurrentHash } from 'data/current-hash'
import { queueMediaItems, getMediaInfo, requestSession } from 'lib/cast-helpers';
import fetchJson from 'lib/fetch-json';
import 'components/icon.css';

const Icon = ({ type, title, onClick, active }) => {
  return <span
    className={active ? 'icon m-active' : 'icon'}
    type={type}
    title={title}
    onClick={onClick}
  />;
};

const castMediaFiles = (item) => {
  requestSession()
    .then(() => fetchJson(`disco/${item.hash}/files`))
    .then(files => files.map(getMediaInfo))
    .then(queueMediaItems);
};

const getTitle = ({ item, type }) => {
  switch (type) {
    case 'open':
      return 'Open in Finder';
    case 'like':
      return item.liked ? 'Remove from Favorites' : 'Add to Favorites';
    case 'info':
      return 'Show detailed information';
    case 'cast':
      return 'Listen to album via Chromecast';
  }
};

const mapStateToProps = (state, { item, type }) => {
  return {
    title: getTitle({ item, type }),
    active: type === 'like' && !!item.liked,
    type
  };
};

const getClickHandler = (dispatch, { item, type }) => {
  switch (type) {
    case 'open':
      return () => fetchJson(`/disco/${item.hash}/open`);
    case 'like':
      return () => fetchJson(`/disco/${item.hash}/like`);
    case 'info':
      return () => dispatch(setCurrentHash(item.hash));
    case 'cast':
      return () => castMediaFiles(item);
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: getClickHandler(dispatch, ownProps)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Icon);
