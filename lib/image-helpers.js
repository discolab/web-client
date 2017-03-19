export {
  loadImage
}

const loaded = new Set();

function loadImage(src) {
  return new Promise((resolve, reject) => {
    if (loaded.has(src)) {
      resolve();
      return;
    }

    const img = new Image();

    img.addEventListener('load', () => {
      loaded.add(src);
      resolve(img);
    });
    img.addEventListener('error', () => reject(img));

    img.src = src;
  });
}
