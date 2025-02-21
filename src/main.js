import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-function.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('#search-input'),
  loader: document.querySelector('#loader'),
  gallery: document.querySelector('#gallery'),
};

function showLoader() {
  refs.loader.classList.remove('hidden');
}

function hideLoader() {
  refs.loader.classList.add('hidden');
}

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const userValue = refs.input.value.trim();
  refs.gallery.innerHTML = '';

  if (!userValue) {
    iziToast.error({
      message: 'Please enter a search term!',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }

  showLoader();

  fetchImages(userValue)
    .then(images => {
      hideLoader();
      refs.gallery.innerHTML = '';

      if (images.length === 0) {
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          timeout: 2000,
        });
      } else {
        renderGallery(images);
      }
    })
    .catch(error => {
      hideLoader();
      refs.gallery.innerHTML = '';

      iziToast.error({
        message: 'Something went wrong! Please try again later.',
        position: 'topRight',
        timeout: 2000,
      });
      console.error('Error fetching images:', error);
    });
  e.target.reset();
});
