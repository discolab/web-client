import React from 'react';
import { connect } from 'react-redux';
import { setCurrentHash } from 'data/current-hash'
import Overlay from 'components/overlay';
import DiscoItemDetails from 'components/disco-item-details'
import FilterBuilder from 'components/filter-builder';
import FilterSelector from 'components/filter-selector';
import VisibleDiscoItems from 'components/visible-disco-items';
import PlayerControls from 'components/player-controls';
import PlayingQueue from 'components/playing-queue';

import 'components/app.css';

const App = ({ currentItem, dispatch, queueVisibility }) => {
  const onClose = () => dispatch(setCurrentHash(null));

  return (
    <div className="app-container">
      <div className="main-content">
        {
          currentItem ?
            <Overlay onClose={onClose}>
              <DiscoItemDetails item={currentItem}/>
            </Overlay>
            : null
        }
        <FilterSelector/>
        <FilterBuilder/>
        <VisibleDiscoItems/>
      </div>
      <PlayingQueue visible={queueVisibility}/>
      <PlayerControls/>
    </div>
  )
};

const getCurrentItem = (items, currentHash) => items.find(({ hash }) => hash === currentHash);

const mapStateToProps = ({ items, currentHash, queueVisibility }) => {
  return {
    currentItem: getCurrentItem(items, currentHash),
    queueVisibility
  };
};

export default connect(
  mapStateToProps
)(App);
