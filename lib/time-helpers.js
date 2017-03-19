export {
  timecode
};

const SECOND = 1000;
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

function timecode(ms) {
  if (isNaN(ms)) {
    return ms;
  }

  const timecode = [];
  const msInt = parseInt(ms, 10);
  const h = Math.floor(msInt / HOUR);
  const m = Math.floor((msInt / MINUTE) % 60);
  const s = Math.floor((msInt / SECOND) % 60);

  if (h > 0) {
    timecode.push(h);
  }
  timecode.push((m < 10 && h > 0) ? '0' + m : m);
  timecode.push((s < 10) ? '0' + s : s);

  return timecode.join(':');
}
