import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_FZdLOQGvauAlFWiIeVKHUdIMYNrZHvDie5nVjad79WjcpJ9b4geWSCG2C4AKNoDD';
const API_URL = 'https://api.thecatapi.com/v1/breeds';
const SEARCH_URL = `https://api.thecatapi.com/v1/images/search`;

function fetchBreeds() {
  return axios.get(API_URL);
}

function createBreedSelectMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value = "${id}" > ${name} </option>`)
    .join('');
}

function fetchCatByBreed(breedId) {
  return axios.get(`${SEARCH_URL}?breed_ids=${breedId}`);
}

function createCatMarkup(arr) {
  console.log(arr);

  return arr
    .map(
      ({
        url,
        breeds: {
          0: { name, temperament, description },
        },
      }) => `<img src="${url}" alt="${name}" width="100%" height="195" />
  <div class="cat-container>
  <h1 class="title">${name}</h1>
  <p class="description">${description}</p>
  <h2>Temperament:</h2>
  <p class="description">${temperament}</p></div>`
    )
    .join('');
}

export {
  fetchBreeds,
  fetchCatByBreed,
  createBreedSelectMarkup,
  createCatMarkup,
};

// function fetchBreeds() {
//   const BASE_URL = 'https://api.thecatapi.com/v1';
//   const END_POINT = '/breeds';

//   const options = {
//     Headers: {
//       'x-api-key':
//         'live_n9RYsu6xXJu2x7fSIMilBDonMvDcz944KTSvauIhyOHhdhcDyRpeUJa4t2le08Oa',
//     },
//   };

//   return fetch(`${BASE_URL}${END_POINT}`, options).then(resp => {
//     if (!resp.ok) {
//       throw new Error(resp.statusText);
//     }

//     return resp.json();
//   });
// }

// function fetchCatByBreed(breedId) {
//   const FORECAST_URL = 'https://api.thecatapi.com/v1/images/search';
//   const API_KEY =
//     'live_n9RYsu6xXJu2x7fSIMilBDonMvDcz944KTSvauIhyOHhdhcDyRpeUJa4t2le08Oa';

//   const params = new URLSearchParams({
//     breed_ids: breedId,
//   });

//   return fetch(`${FORECAST_URL}?api_key=${API_KEY}&${params}`).then(resp => {
//     if (!resp.ok) {
//       throw new Error(resp.statusText);
//     }

//     return resp.json();
//   });
// }
