import React from 'react';
import { connect } from 'react-redux';
import {
  addCastUpdateListener,
  removeCastUpdateListener,
  play,
  pause,
  playNext,
  playPrev,
  setVolume,
  getVolume
}  from 'lib/cast-helpers';
import { timecode } from 'lib/time-helpers';
import { toggleQueueVisibility } from 'data/queue-visibility';

import 'components/player-controls.css';

function onMediaUpdate({ items, volume, currentItemId, currentTime }) {

  this.setState({
    volume,
    currentTime,
    currentItem: items.find(({ itemId }) => currentItemId === itemId)
  });
}

const PlayerControls = React.createClass({

  getInitialState() {
    return {
      currentTime: null,
      currentItem: null,
      volume: getVolume()
    };
  },

  componentDidMount() {
    addCastUpdateListener(onMediaUpdate, this);
  },

  componentWillUnmount() {
    removeCastUpdateListener(this);
  },

  render() {
    const { dispatch } = this.props;
    const { currentTime, currentItem, volume } = this.state;

    const onClick = () => dispatch(toggleQueueVisibility());
    const onPrevClick = (e) => {
      e.stopPropagation();
      playPrev();
    };
    const onVolumeChange = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setVolume(e.target.value / 100);
    };
    const onNextClick = (e) => {
      e.stopPropagation();
      playNext();
    };

    return (
      <div className="player-controls show" onClick={onClick}>

        <div className="button-group">
          <div className="play-control">
            <div className="play-button playing">
              <div className="play" onClick={pause}/>
              <div className="pause" onClick={play}/>
            </div>
          </div>
          <svg className="player-controls--icon skip-previous" onClick={onPrevClick}>
            <use xlinkHref="/assets/sprite.svg#skip-previous"/>
          </svg>
          <svg className="player-controls--icon skip-next" onClick={onNextClick}>
            <use xlinkHref="/assets/sprite.svg#skip-next"/>
          </svg>
        </div>

        <div className="currentInfo">
          <div className="wrapper">
            <p>
              <span className="title">{currentItem && currentItem.media.metadata.title}</span>
              <span className="artist"> — {currentItem && currentItem.media.metadata.artist}</span>
            </p>
          </div>
        </div>

        <div className="time">
          <div className="elapsed">{currentTime && timecode(currentTime)}</div>
          <div className="length">4:04</div>
        </div>

        <div className="timeline">
          <div className="full"/>
          <div className="handle" style={{ marginLeft: 145 }}>
            <div className="dot"/>
          </div>
          <div className="progress" style={{ width: 150 }}/>
        </div>

        <div className="extras">
          <svg className="player-controls--icon volume">
            <use xlinkHref="/assets/sprite.svg#volume"/>
            <use xlinkHref="/assets/sprite.svg#mute" className="mute"/>
          </svg>
          <div className="volume-control">
            <div className="wrapper">
              <div className="volume-slidebar">
                <div className="volume-level" style={{ top: 100 - volume * 100 }}/>
              </div>
              <input type="range" defaultValue="50" min="0" max="100" step="1" onChange={onVolumeChange}/>
            </div>
          </div>
        </div>

      </div>
    );
  }

});

export default connect()(PlayerControls);

