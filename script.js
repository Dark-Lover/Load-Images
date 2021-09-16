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

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);
    const myimgs = await Promise.all(imgs);
    myimgs.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.log(err);
  }
};
// createImage('/img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     return waitFunc(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('/img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     return waitFunc(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('/img/img-3.jpg');
//   })
//   .catch(err => console.log(err));

const loadImages = async function () {
  try {
    // image 1
    let img = await createImage('/img/img-1.jpg');
    await waitFunc(2);
    img.style.display = 'none';
    // image 1
    img = await createImage('/img/img-2.jpg');
    await waitFunc(2);
    img.style.display = 'none';
    // image 1
    img = await createImage('/img/img-3.jpg');
    await waitFunc(2);
  } catch (err) {
    console.log(err);
  }
};

// loadImages();

loadAll(['/img/img-1.jpg', '/img/img-2.jpg', '/img/img-3.jpg']);
