import axios from 'axios';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTAxZTNjNDNiMzE5ZmRmOGE1YmI4MDRhMjM0ZGY2MCIsIm5iZiI6MTcyMjU1MTUzNS43NjcxMTcsInN1YiI6IjY2NmNhMWEyY2NmMGMyZjFmZWVmMmYwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10dynE_Ep_ulqKscVZ8jog21MyyVIkD3M4LSdSUJ2Wk',
  },
};

const fetchTrendingMovies = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;
  const response = await axios.get(url, options);

  return response.data;
};

export default fetchTrendingMovies;

export const fetchMovies = async (query, page = 1) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
  const response = await axios.get(url, options);

  return response.data;
};

export const fetchMovieById = async (movie_id) => {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`;
  const response = await axios.get(url, options);

  return response.data;
};

export const fetchMovieCast = async (movie_id) => {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`;
  const response = await axios.get(url, options);

  return response.data.cast;
};

export const fetchMovieReview = async (movie_id) => {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/reviews?language=en-US`;
  const response = await axios.get(url, options);

  return response.data.results;
};
