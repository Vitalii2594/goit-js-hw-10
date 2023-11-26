import Notiflix, { Notify } from 'notiflix';
import SlimSelect from 'slim-select';

import {
  fetchBreeds,
  fetchCatByBreed,
  createBreedSelectMarkup,
  createCatMarkup,
} from './cat-api';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.getElementById('catInfo'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
};

refs.breedSelect.addEventListener('change', onCatId);

fetchBreeds()
  .then(arr => {
    load();

    refs.breedSelect.insertAdjacentHTML(
      'beforeend',
      createBreedSelectMarkup(arr.data)
    );
  })
  .then(() => slim())
  .catch(fetchError);

function onCatId(e) {
  const id = e.target.value;
  fetchCatByBreed(id)
    .then(arr => {
      load();

      const catData = arr.data;

      if (!Array.isArray(catData) || catData.length === 0 || !catData[0].url) {
        refs.catInfo.innerHTML = '';
        fetchError('Дані для цієї породи відсутні');
        return;
      }

      refs.catInfo.innerHTML = createCatMarkup(catData);
      success(); // Виклик функції успіху
    })
    .catch(fetchError);
}

function success() {
  Notify.success('Search was successful', '');
}

function fetchError(message) {
  Notify.failure(message, {
    position: 'center-center',
    timeout: 3000,
    width: '400px',
    fontSize: '24px',
  });
}

function load() {
  refs.breedSelect.hidden = false;
  refs.loaderEl.classList.remove('loader');
}

function slim() {
  new SlimSelect({
    select: refs.breedSelect,
  });
}
