export {
  flatten,
  unique
};

function flatten(items) {
  return items.reduce((acc, item) => acc.concat(Array.isArray(item) ? flatten(item) : item), [])
}

function unique(items) {
  return items.reduce((acc, item) => {
    if (acc.indexOf(item) < 0) {
      acc.push(item);
    }
    return acc;
  }, []);
}
