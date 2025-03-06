import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from '../../js/pixabay-api';

import {
  clearGallery,
  hideLoader,
  renderGallery,
  showLoader,
} from '../../js/render-functions';

iziToast.settings({
  position: 'topRight',
});

const searchForm = document.querySelector('.form');
const input = document.querySelector('input[name=query]');

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
  showLoader();

  fetchImages(query)
    .then(images => {
      if (!images.length) {
        iziToast.error({ message: 'Images not found. Enter new query' });
        return;
      }
      renderGallery(images);
    })
    .catch(e => {
      iziToast.error({ message: e.message });
    })
    .finally(() => {
      hideLoader();
    });
});
