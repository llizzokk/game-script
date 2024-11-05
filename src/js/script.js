'use strict';

const btn = document.querySelector('.start-btn');
const container = document.querySelector('.container');
const result = document.querySelector('.result');

btn.addEventListener('click', handleClick);

function handleClick(event) {
  btn.disabled = true;
  result.innerHTML = '';

  const promises = [...container.children].map(() => {
    return new Promise((resolve, reject) => {
      const random = Math.random();

      if (random > 0.5) {
        resolve('☀️');
      } else {
        reject('❄️');
      }
    });
  });
  Promise.allSettled(promises).then(data => {
    const win =
      data.every(item => item.status === 'fulfilled') ||
      data.every(item => item.status === 'rejected');

    data.forEach((item, i) => {
      container.children[i].textContent = '';

      setTimeout(() => {
        container.children[i].textContent = item.value || item.reason;

        if (i === data.length - 1) {
          result.innerHTML = win ? 'You win' : 'You loose';
          btn.disabled = false;
        }
      }, 1000 * (i + 1));
    });
  });
}
