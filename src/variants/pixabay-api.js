// import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com/api';
// axios.defaults.params = {
//   key: '47404996-12b53dec464063fd6255bb496',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   per_page: 12,
//   safesearch: true,
// };

// export const fetchImages = async query => {
//   const { data } = await axios.get('/', {
//     params: { q: query },
//   });

//   return data.hits;
// };

// import axios from 'axios';
// const API_KEY = '47404996-12b53dec464063fd6255bb496';

// export const fetchImages = async query => {
//   try {
//     const response = await axios.get(
//       `https://pixabay.com/api/?q=${query}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&safesearch=true`
//     );

//     return response.data.hits;
//   } catch (error) {
//     console.log(error.message);
//     throw error;
//   }
// };

import axios from 'axios';
const API_KEY = '47404996-12b53dec464063fd6255bb496';

export const fetchImages = query => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${query}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&safesearch=true`
    )
    .then(({ data }) => data)
    .catch(error => {
      console.log(error.message);
      throw error;
    });
};

// import axios from 'axios';
// const API_KEY = '47404996-12b53dec464063fd6255bb496';

// export const fetchImages = async query => {
//   const searchParams = new URLSearchParams({
//     q: query,
//     key: API_KEY,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     per_page: 12,
//     safesearch: true,
//   });
//   try {
//     const response = await axios.get(
//       `https://pixabay.com/api/?${searchParams.toString()}`
//     );

//     return response.data.hits;
//   } catch (error) {
//     console.log(error.message);
//     throw error;
//   }
// };
