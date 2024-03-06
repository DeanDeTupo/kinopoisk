const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': 'S04KBVQ-K4YMS46-JHFMTSV-MCDK292',
  },
};

fetch(
  'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=100&year=2015-2024&rating.kp=8-10',
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
