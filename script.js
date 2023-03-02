const BASE_URL = 'https://kitsu.io/api/edge';
const animeContainer = document.getElementById('anime-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

function searchAnime(query) {
  fetch(`${BASE_URL}/anime?filter[text]=${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json'
    }
  })
  .then(response => response.json())
  .then(data => {
    animeContainer.innerHTML = ''; // hapus data lama

    // buat elemen baru untuk menampilkan hasil pencarian
    data.data.forEach(anime => {
      const animeTitle = document.createElement('h2');
      const animePoster = document.createElement('img');
      const animeDescription = document.createElement('p');

      // isi data anime ke dalam elemen baru
      animeTitle.textContent = anime.attributes.titles.en_jp;
      animePoster.src = anime.attributes.posterImage.small;
      animeDescription.textContent = anime.attributes.synopsis;

      // tambahkan elemen baru ke dalam container HTML
      animeContainer.appendChild(animeTitle);
      animeContainer.appendChild(animePoster);
      animeContainer.appendChild(animeDescription);
    });
  })
  .catch(error => console.error(error));
}

searchButton.addEventListener('click', () => {
  const query = searchInput.value;
  searchAnime(query);
});