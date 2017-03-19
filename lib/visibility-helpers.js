export {
  whenElementVisible
}

const threshold = [0, 0.25, 0.5, 0.75, 1];
const rootMargin = '40px';
const observer = new window.IntersectionObserver(observerCallback, { threshold, rootMargin });

const callbacks = window.callbacks = new WeakMap();

/**
 * Returns a promise that is resolved when `element` enters the viewport
 *
 * @param {HTMLElement} element
 * @return {Promise}
 */
function whenElementVisible(element)  {
  return new Promise((resolve) => {
    observe(element, (entry) => {
      if (isVisible(entry)) {
        unobserve(element);
        resolve();
      }
    });
  });
}

function observerCallback(ioEntries) {
  ioEntries.forEach((entry) => {
    const element = entry.target;
    if (callbacks.has(element)) {
      callbacks.get(element).forEach((callback) => callback(entry));
    }
  });
}

function isVisible(observerChangeEntry) {
  return observerChangeEntry.intersectionRatio > 0;
}

function observe(element, callback) {
  addCallback(element, callback);
  observer.observe(element);
}

function unobserve(element) {
  removeCallbacks(element);
  observer.unobserve(element);
}

function addCallback(element, callback) {
  if (callbacks.has(element)) {
    callbacks.get(element).push(callback);
  } else {
    callbacks.set(element, [ callback ]);
  }
}

function removeCallbacks(element) {
  // When an observed DOM element is deleted, the list of callbacks is removed too.
  callbacks.delete(element);
}
