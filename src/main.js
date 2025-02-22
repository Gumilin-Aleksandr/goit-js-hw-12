import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, smoothScroll } from './js/render-function.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('#search-input'),
  loader: document.querySelector('#loader'),
  gallery: document.querySelector('#gallery'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

let userValue = '';
let page = 1;

function showLoader() {
  refs.loader.classList.remove('hidden');
}

function hideLoader() {
  refs.loader.classList.add('hidden');
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('hidden');
}

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  userValue = refs.input.value.trim();
  page = 1;
  refs.gallery.innerHTML = '';

  if (!userValue) {
    iziToast.error({
      message: 'Please enter a search term!',
      position: 'topRight',
      timeout: 2000,
    });
    hideLoadMoreBtn();
    return;
  }

  showLoader();
  hideLoadMoreBtn();

  try {
    const data = await fetchImages(userValue, page);
    showLoader();

    if (data.hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 2000,
      });
      hideLoader();
      e.target.reset();
      return;
    }

    renderGallery(data.hits);
    hideLoader();

    if (data.totalHits > page * 40) {
      showLoadMoreBtn();
    }
  } catch (error) {
    hideLoader();
    refs.gallery.innerHTML = '';

    iziToast.error({
      message: 'Something went wrong! Please try again later.',
      position: 'topRight',
      timeout: 2000,
    });
    console.error('Error fetching images:', error);
  }

  e.target.reset();
});

refs.loadMoreBtn.addEventListener('click', async () => {
  page += 1;

  showLoader();
  hideLoadMoreBtn();

  try {
    const data = await fetchImages(userValue, page);
    showLoader();
    renderGallery(data.hits);
    hideLoader();
    showLoadMoreBtn();

    if (data.totalHits <= page * 40) {
      hideLoadMoreBtn();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 3000,
      });
    }
    smoothScroll();
  } catch (error) {
    hideLoader();
    refs.gallery.innerHTML = '';

    iziToast.error({
      message: 'Something went wrong! Please try again later.',
      position: 'topRight',
      timeout: 2000,
    });
    console.error('Error fetching images:', error);
  }
});
