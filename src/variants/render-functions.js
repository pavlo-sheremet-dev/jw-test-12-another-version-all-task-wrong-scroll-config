import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  galleryContainer: document.querySelector('ul.gallery'),
  loader: document.querySelector('.loader'),
};

const modal = new SimpleLightbox('a.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

const createGalleryMarkup = images => {
  return (
    /* HTML */
    `${images
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
          id,
        }) =>
          /* HTML */
          `<li class="gallery-item" id="${id}">
            <a class="gallery-link" href="${largeImageURL}">
              <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
              <div>
                <span>Likes: ${likes}</span>
                <span>Views: ${views}</span>
                <span>Comments: ${comments}</span>
                <span>Downloads: ${downloads}</span>
              </div>
            </a>
          </li>`
      )
      .join('')}`
  );
};

export const renderGallery = images => {
  const galleryMarkup = createGalleryMarkup(images);
  refs.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
  modal.refresh();
};

export const clearGallery = () => {
  refs.galleryContainer.innerHTML = '';
};

export const showLoader = () => {
  refs.loader.classList.add('show');
};

export const hideLoader = () => {
  refs.loader.classList.remove('show');
};
