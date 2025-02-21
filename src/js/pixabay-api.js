import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '48844443-e0420521c284cbb6eb3a15b37';

export function fetchImages(imageTitle) {
  return axios
    .get(BASE_URL, {
      params: {
        q: imageTitle,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data.hits)
    .catch(error => {
      console.error('API Fetching Error:', error);
      throw error;
    });
}
