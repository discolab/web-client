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

function onMediaUpdate({ items, volume, currentMedia, currentItemId, currentTime }) {
  this.setState({
    volume,
    currentTime,
    progress: currentMedia.currentTime / currentMedia.media.duration,
    playerState: currentMedia.playerState,
    currentItem: items.find(({ itemId }) => currentItemId === itemId)
  });
}

const PlayerControls = React.createClass({

  getInitialState() {
    return {
      progress: 0,
      currentTime: null,
      currentItem: null,
      playerState: 'LOADING',
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
    const { currentTime, currentItem, volume, playerState, progress } = this.state;

    const isPlaying = playerState === 'PLAYING';
    const makeHandler = (fn) => (e) => {
      e.stopPropagation();
      e.preventDefault();
      fn(e);
    };

    const onClick = makeHandler(() => dispatch(toggleQueueVisibility()));
    const onPrevClick = makeHandler(() => playPrev());
    const onVolumeChange = makeHandler((e) => setVolume(e.target.value / 100));
    const onNextClick = makeHandler(() => playNext());
    const onPlayClick = makeHandler(() => play());
    const onPauseClick = makeHandler(() => pause());
    const onVolumeMouseDown = (e) => e.stopPropagation();

    return (
      <div className="player-controls show" onClick={onClick}>

        <div className="button-group">
          <div className="play-control">
            <div className={['play-button', isPlaying ? ' playing' : '' ].join(' ')}>
              <div className="play" onClick={onPlayClick}/>
              <div className="pause" onClick={onPauseClick}/>
            </div>
          </div>
          <div className="player-controls--icon skip-previous" onClick={onPrevClick}>
          </div>
          <div className="player-controls--icon skip-next" onClick={onNextClick}>
          </div>
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
          <div className="elapsed">{currentTime && timecode(currentTime * 1000)}</div>
          <div className="length">4:04</div>
        </div>

        <div className="timeline">
          <div className="full"/>
          <div className="handle" style={{ marginLeft: `${progress * 100}%` }}>
            <div className="dot"/>
          </div>
          <div className="progress" style={{ width: `${progress * 100}%` }}/>
        </div>

        <div className="extras">
          <div className="player-controls--icon volume" />
          <div className="volume-control">
            <div className="wrapper">
              <div className="volume-slidebar">
                <div className="volume-level" style={{ top: 100 - volume * 100 }}/>
              </div>
              <input type="range" defaultValue="50" min="0" max="100" step="1"
                     onChange={onVolumeChange}
                     onClick={onVolumeMouseDown}
              />
            </div>
          </div>
        </div>

      </div>
    );
  }

});

export default connect()(PlayerControls);

