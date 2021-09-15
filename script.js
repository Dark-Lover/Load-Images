'use strict';

// UI elements
let imgBox = document.querySelector('.images');
let currentImg;
const waitFunc = function (seconds) {
  return new Promise(res => {
    setTimeout(res, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise((res, rej) => {
    let imgEl = document.createElement('img');
    imgEl.src = imgPath;
    imgEl.addEventListener('load', () => {
      imgBox.append(imgEl);
      res(imgEl);
    });
    imgEl.addEventListener('error', () => {
      rej('error Loading the image: ' + imgPath);
    });
  });
};

createImage('/img/img-1.jpg')
  .then(img => {
    currentImg = img;
    return waitFunc(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('/img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    return waitFunc(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('/img/img-3.jpg');
  })
  .catch(err => console.log(err));
