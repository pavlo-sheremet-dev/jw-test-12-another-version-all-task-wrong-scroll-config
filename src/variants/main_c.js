import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from '../../js/pixabay-api';

import { clearGallery, renderGallery } from '../../js/render-functions';

iziToast.settings({
  position: 'topRight',
});

const searchForm = document.querySelector('.form');
const input = document.querySelector('input[name=query]');
const loader = document.querySelector('div.loader');

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const query = input.value.trim().toLowerCase();

  if (!query) {
    iziToast.warning({ message: 'Enter the query' });
    e.target.reset();
    input.focus();
    return;
  }

  clearGallery();
  loader.classList.add('show');

  fetchImages(query)
    .then(images => {
      if (!images.length) {
        iziToast.error({ message: 'Images not found. Enter new query' });
        return;
      }
      renderGallery(data.hits);
    })
    .catch(e => {
      iziToast.error({ message: e.message });
    })
    .finally(() => {
      loader.classList.remove('show');
    });
});
