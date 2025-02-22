import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '48844443-e0420521c284cbb6eb3a15b37';

export async function fetchImages(imageTitle, page) {
  const params = {
    q: imageTitle,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 40,
  };
  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('API Fetching Error:', error);
    throw error;
  }
}
