import React from 'react';
import { timecode } from 'lib/time-helpers';
import {
  addCastUpdateListener,
  removeCastUpdateListener,
  jumpToItem
}  from 'lib/cast-helpers';


import 'components/playing-queue.css';

function onCastUpdate({ items : queue, currentItemId }) {
  const currentItem = queue.find(({ itemId }) => itemId === currentItemId);

  this.setState({
    queue,
    currentItem
  });
}

const PlayingQueue =  React.createClass({

  componentDidMount() {
    addCastUpdateListener(onCastUpdate, this);
  },

  componentWillUnmount() {
    removeCastUpdateListener(this);
  },

  getInitialState() {
    return {
      currentItem: null,
      queue: []
    };
  },

  render() {
    const { visible } = this.props;
    const { currentItem, queue } = this.state;
    const bgImage = {
      backgroundImage: `url(${currentItem && currentItem.media.metadata.images[0].url})`
    };
    const getItemClickHandler = (itemId) => (e) => {
      e.preventDefault();
      jumpToItem(itemId);
    };

    return (
      <div className={ visible ? 'playing-queue m-visible' : 'playing-queue'}>

        <div className="close">
          <div className="svgIcon">
          </div>
        </div>

        <div className="playing-queue--content">
          <div className="playing-queue--left">
            <div className="header">
              <h1>Currently Playing</h1>
            </div>
            <div className="playing-queue--cover">
              <div className="playing-queue--cover-overlay"/>
              <div className="playing-queue--cover-image" style={bgImage} />
            </div>
            <div className="playing-queue--info">
              <h1>{currentItem && currentItem.media.metadata.title}</h1>
              <h4>{currentItem && currentItem.media.metadata.artist}</h4>
            </div>

          </div>
          <div className="playing-queue--right">
            <div className="playing-queue--right-wrapper">
              <div className="playing-queue--right-content">
                <div className="header">
                  <h1>Up Next</h1>
                </div>

                {queue.map((item) => {
                  const { artist, title } = item.media.metadata;
                  const trackCover = {
                    backgroundImage: `url(${item.media.metadata.images[0].url})`
                  };

                  return (
                    <div className="playing-queue--track-item" data-time={timecode(item.media.duration * 1000)}
                         key={item.itemId}
                         onClick={getItemClickHandler(item.itemId)}>
                      <div className="img" style={trackCover}/>
                      <div className="info">
                        <h3>{title}</h3>
                        <h5>{artist}</h5>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

});

export default PlayingQueue;

