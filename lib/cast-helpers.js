import { clamp } from 'lib/math-helpers';

export {
  initializeChromecastApi,
  getMediaInfo,
  loadMediaItem,
  queueMediaItems,
  requestSession,
  playNext,
  playPrev,
  pause,
  play,
  addCastUpdateListener,
  removeCastUpdateListener,
  setVolume,
  getVolume,
  jumpToItem
}

const log = console.log.bind(console);

const listeners = new Map();

let currentMedia = null;
let currentSession = null;

function addCastUpdateListener(fn, context) {
  if (!listeners.get(context)) {
    listeners.set(context, []);
  }
  listeners.get(context).push(fn);
}

function removeCastUpdateListener(context) {
  listeners.delete(context);
}

function whenCastApiReady() {
  return new Promise((resolve) => {
     if (isChromeSenderAPIAvailable()) {
       resolve();
     } else {
       setTimeout(() => whenCastApiReady().then(resolve), 250);
     }
  });
}

function isChromeSenderAPIAvailable() {
  return !!(chrome && chrome.cast && chrome.cast.isAvailable);
}

function initializeChromecastApi() {
  return whenCastApiReady().then(() => {
    const autoJoinPolicy = chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED;
    const sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, setupCurrentSession, receiverListener, autoJoinPolicy);

    chrome.cast.initialize(apiConfig, onInitSuccess, onCastError);
    chrome.cast.addReceiverActionListener(onReceiverAction);
  });
}

function toggleSessionEventListeners(session, onOrOff) {
  if (onOrOff) {
    session.addUpdateListener(onSesssionStatusChange);
    session.addMediaListener(onNewMedia);
  } else {
    session.removeUpdateListener(onSesssionStatusChange);
    session.removeMediaListener(onNewMedia);
  }
}

function onSesssionStatusChange() {
  if (currentSession) {
    log(`session status change: ${currentSession.status}`);

    getCurrentMedia() && setupCurrentMedia(getCurrentMedia());

    switch (currentSession.status) {
      case 'connected':
        printQueue();
        break;
      case chrome.cast.SessionStatus.STOPPED:
      case chrome.cast.SessionStatus.DISCONNECTED:
        toggleSessionEventListeners(currentSession, false);
        currentSession = null;
        break;
    }
  }
}

function onNewMedia(media) {
  log(`new media ${media}`);
  setupCurrentMedia(media);
}

function setupCurrentMedia(media) {
  if (media !== currentMedia) {
    if (currentMedia) {
      log('removing media update listener');
      currentMedia.removeUpdateListener(onMediaUpdate);
    }
    currentMedia = media || null;
    if (currentMedia) {
      log('adding media update listener');
      currentMedia.addUpdateListener(onMediaUpdate);
    }
  }
}

function onMediaUpdate(isAlive) {
  console.log('media update', getCurrentMedia() && getCurrentMedia().playerState);
  if (isAlive) {
    console.log('title', getCurrentMedia() && getCurrentMedia().media.metadata.title);
    printQueue();
  } else {
    setupCurrentMedia(null);
  }
}

function receiverListener(availability) {
  const { ReceiverAvailability } = chrome.cast;

  switch (availability) {
    case ReceiverAvailability.AVAILABLE:
      log('cast device is available');
      break;
    case ReceiverAvailability.UNAVAILABLE:
      log('cast device is unavailable');
      break;
  }
}

function onInitSuccess() {
  log('Cast Sender is inited');
}

function onCastError(error) {
  log(`Cast error: ${error.description}`);
}

function onReceiverAction(receiver, action) {
  log(`Receiver action: receiverId=${receiver.friendlyName} ${action}`);
}

function requestSession() {
  return new Promise((resolve, reject) => {
    if (isCurrentSesssionActive()) {
      resolve(currentSession);
    } else {
      log('Requesting cast session...');
      chrome.cast.requestSession(
        (session) => {
          setupCurrentSession(session);
          resolve(session);
        },
        (error) => {
          onCastError(error);
          reject(error);
        }
      );
    }
  });
}

function setupCurrentSession(session) {
  log(`session listener: ${session.sessionId}`);

  if (session !== currentSession && session.status !== chrome.cast.SessionStatus.DISCONNECTED) {
    if (currentSession) {
      toggleSessionEventListeners(currentSession, false);
    }
    currentSession = window.currentSession = session;
    toggleSessionEventListeners(currentSession, true);

    log(`new current session: ${session.media.length} media(s) files`);

    if (session && session.media.length) {
      log('Joining already playing session');
      printQueue();
      setupCurrentMedia(session.media[0]);
    }
  }
}

function isCurrentSesssionActive() {
  return !!(currentSession && currentSession.status === chrome.cast.SessionStatus.CONNECTED);
}

function loadMediaItem(mediaItem) {
  requestSession()
    .then((session) => {
      const loadRequest = new chrome.cast.media.LoadRequest(mediaItem);
      loadRequest.autoplay = true;
      loadRequest.currentTime = 0;

      session.loadMedia(loadRequest, setupCurrentMedia, onCastError);
    });
}

function queueMediaItems(mediaInfoItems) {
  requestSession().then()
    .then((session) => {
      session.queueLoad(
        new chrome.cast.media.QueueLoadRequest(
          mediaInfoItems
            .slice(0, 35)
            .map(createQueueItem)
        ),
        setupCurrentMedia,
        onCastError
      );
    })
    .catch((e) => console.log('queue error', e));
}

function createQueueItem(mediaInfo) {
  const queueItem = new chrome.cast.media.QueueItem(mediaInfo);
  queueItem.autoplay = true;
  queueItem.preloadTime = 10;

  return queueItem;
}

function getMediaInfo({ streamUrl, mimeType, artist, title, coverUrl, duration }) {
  const mediaInfo = new chrome.cast.media.MediaInfo(streamUrl, mimeType);

  const metadata = new chrome.cast.media.MusicTrackMediaMetadata();
  metadata.artist = artist;
  metadata.title = title;

  mediaInfo.streamType = chrome.cast.media.StreamType.BUFFERED;

  if (coverUrl) {
    metadata.images = [ new chrome.cast.Image(coverUrl)];
  }

  mediaInfo.metadata = metadata;
  mediaInfo.duration = duration;

  return mediaInfo;
}

function playNext() {
  getCurrentMedia() && getCurrentMedia().queueNext();
}

function playPrev() {
  getCurrentMedia() && getCurrentMedia().queuePrev();
}

function pause() {
  getCurrentMedia() && getCurrentMedia().pause(new chrome.cast.media.PauseRequest());
}

function play() {
  getCurrentMedia() && getCurrentMedia().play(new chrome.cast.media.PlayRequest());
}

function getCurrentMedia() {
  return currentSession && currentSession.media[0];
}

function printQueue() {
  const currentMedia = getCurrentMedia();

  if (currentMedia) {
    const data = {
      currentMedia,
      items: currentMedia.items || [],
      currentItemId: currentMedia.currentItemId,
      currentTime: currentMedia.currentTime,
      playerState: currentMedia.playerState,
      volume: getVolume()
    };

    Array.from(listeners.keys()).forEach((context) => {
      listeners.get(context).forEach((fn) => fn.call(context, data));
    });
  }
}

function jumpToItem(itemId) {
  getCurrentMedia() && getCurrentMedia().queueJumpToItem(itemId);
}

function setVolume(volume) {
  if (currentSession) {
    volume = clamp(volume, 0, 1);
    currentSession.setReceiverVolumeLevel(volume, null, onCastError);
  }
}

function getVolume() {
  return currentSession ? currentSession.receiver.volume.level || 0 : 0;
}
