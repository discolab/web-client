export {
  precise,
  clamp
};

function precise(number, precision) {
  precision = Math.pow(10, precision || 0);
  return Math.round(number * precision) / precision;
}

function clamp(number, min, max) {
  return Math.min(max, Math.max(min, number));
}

