import axios from 'axios';

const baseURL = 'https://api.themoviedb.org/3/';
const KEY = 'dbfd52a630db0a4b391a78e271099a07';

//trending movies
export const getTrendingMovies = async () => {
  const { data } = await axios.get(
    `${baseURL}/trending/movie/day?api_key=${KEY}`
  );
  return data.results;
};

// movie details

export const getMovieDetails = async id => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}`
  );

  return res.data;
};

//cast

export const fetchMovieCast = async movieId => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${KEY}&language=en-US`
  );

  return data.cast;
};

//reviews

export const fetchMovieReviews = async movieId => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${KEY}`
  );
  return data.results;
};

// search movies

export const getMoviesByName = async query => {
  const { data } = await axios.get(
    `${baseURL}/search/movie?api_key=${KEY}&query=${query}&language=en-US&page=1&include_adult=false?api_key=${KEY}`
  );
  return data.results;
};
