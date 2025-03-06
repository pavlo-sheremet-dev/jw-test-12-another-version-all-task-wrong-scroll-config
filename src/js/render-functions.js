import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderGallery(images, galleryContainer, append = false) {
  const galleryMarkup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
              <img
                class="gallery-image"
                src="${webformatURL}"
                alt="${tags}"
              />
            </a>
            <div class="text-container">
                <p class="text"><span class="text-value">Likes</span> ${likes}</p>
                <p class="text"><span class="text-value">Views</span> ${views}</p>
                <p class="text"><span class="text-value">Comments</span> ${comments}</p>
                <p class="text"><span class="text-value">Downloads</span> ${downloads}</p>
            </div>
          </li>`
    )
    .join('');
  if (append) {
    galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
  } else {
    galleryContainer.innerHTML = galleryMarkup;
  }

  lightbox.refresh();
}
