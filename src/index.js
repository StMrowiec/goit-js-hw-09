// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const searchInput = document.getElementById('search-box');
const ul = document.getElementsByClassName('country-list')[0];
const div = document.getElementsByClassName('country-info')[0];

// Dodać debounce
searchInput.addEventListener('keyup', async () => {
  let results = [];
  let input = searchInput.value.trim();
  if (input.length) {
    results = await fetchCountries(input);
  }

  renderResults(results);
  console.log(results);
});

function renderResults(results) {
  let content = results
    .map(item => {
      if (results.length > 1 && results.length <= 10) {
        return `<li>
            <div class="listyle">
              <img src=${item.flags.svg}>
              <h1>${item.name.official}</h1>
            </div>
          </li>`;
      } else if (results.length === 1) {
        return `
        <div class="listyle">
          <img src=${item.flags.svg}>
          <h1>${item.name.official}</h1>
        </div>
        <div class="info">
          <h2>Capital: ${item.capital}</h2>
          <h2>Population: ${item.population}</h2>
          <h2>Languages: ${Object.values(item.languages)}</h2>
        </div>
      `;
      }
    })
    .join('');

  // Do zamienienia na powiadomienie notiflix zamiast Console.log
  if (results.length > 10) {
    console.log('Too many matches found. Please enter a more specific name.');
  }
  // Do zamienienia na powiadomienie notiflix zamiast Console.log
  if (results.length === 0) {
    console.log('Oops, there is no country with that name');
  }

  if (results.length === 1) {
    div.innerHTML = content;
    ul.innerHTML = '';
  } else {
    ul.innerHTML = content;
    div.innerHTML = '';
  }
}
