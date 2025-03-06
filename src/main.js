import { fetchSearch } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  galleryContainer: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadbtn: document.querySelector('.load-more'),
};

export let page = 1;
export let per_page = 15;
let search = '';

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  search = e.target.elements.query.value.trim();
  refs.loader.classList.add('show');
  page = 1;

  try {
    const response = await fetchSearch(search, page, per_page);
    refs.form.reset();
    const imagesData = response.data.hits;
    const totalHits = response.data.totalHits;
    if (imagesData.length === 0) {
      refs.loadbtn.classList.remove('show');
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    renderGallery(imagesData, refs.galleryContainer);
    page += 1;
    if (totalHits > per_page) {
      refs.loadbtn.classList.add('show');
    } else {
      refs.loadbtn.classList.remove('show');
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: 'An error occurred while fetching data. Please try again later!',
    });
    console.log(error);
  } finally {
    refs.loader.classList.remove('show');
  }
});

refs.loadbtn.addEventListener('click', async e => {
  e.preventDefault();
  refs.loadbtn.classList.remove('show');
  refs.loader.classList.add('show');
  try {
    const response = await fetchSearch(search, page, per_page);
    const imagesData = response.data.hits;
    const totalHits = response.data.totalHits;
    renderGallery(imagesData, refs.galleryContainer, true);
    page += 1;
    scrollPage();
    const totalPages = page * per_page;
    if (totalPages >= totalHits) {
      refs.loadbtn.classList.remove('show');
      iziToast.info({
        position: 'topRight',
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      refs.loadbtn.classList.add('show');
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: 'An error occurred while fetching data. Please try again later!',
    });
    console.log(error);
  } finally {
    refs.loader.classList.remove('show');
  }
});

function scrollPage() {
  const info = refs.galleryContainer.firstElementChild.getBoundingClientRect();
  const height = info.height;
  scrollBy({
    behavior: 'smooth',
    top: height * 3,
  });
}
