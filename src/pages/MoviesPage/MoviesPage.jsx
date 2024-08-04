import s from './MoviesPage.module.css';

import { useEffect, useState } from 'react';
import { fetchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import Loader from '../../components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterValue = searchParams.get('query') ?? '';
  const [query, setQuery] = useState(filterValue);

  useEffect(() => {
    const searchMovies = async () => {
      if (!filterValue) return;

      setIsLoading(true);
      try {
        const response = await fetchMovies(filterValue, page);
        if (page === 1) {
          setMovies(response.results);
          setTotal(response.total_results);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...response.results]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    searchMovies();
  }, [filterValue, page]);

  const handleChangeFilter = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (!query) {
      setSearchParams({});
      setMovies([]);
      setPage(1);
      return;
    }
    setSearchParams({ query });
    setPage(1);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <div className={s.searchCotainer}>
        <input
          className={s.input}
          type="search"
          value={query}
          onChange={handleChangeFilter}
          placeholder="Search for movies"
        />
        <button className={s.searchButton} type="submit" onClick={handleSearch}>
          Search
        </button>
      </div>

      <MovieList movies={movies} />
      {isLoading && <Loader />}
      {total > movies.length && !isLoading && (
        <LoadMoreBtn onClick={loadMore} />
      )}
    </div>
  );
};

export default MoviesPage;
