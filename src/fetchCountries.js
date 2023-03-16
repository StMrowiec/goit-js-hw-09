// Data fetcher
export async function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => response.json())
    .catch(error => console.log(`Something went wrong! ${error}`));
}
