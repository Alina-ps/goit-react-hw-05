import { useEffect, useState } from 'react';
import { fetchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import Loader from '../../components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterValue = searchParams.get('query') ?? '';

  useEffect(() => {
    const searchMovies = async () => {
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

  const handleChangeFilter = (newValue) => {
    if (!newValue) {
      return setSearchParams({});
    }

    searchParams.set('query', newValue);

    setSearchParams(searchParams);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <SearchBar
        handleChangeFilter={handleChangeFilter}
        filterValue={filterValue}
      />
      <MovieList movies={movies} />
      {isLoading && <Loader />}
      {total > movies.length && !isLoading && (
        <LoadMoreBtn onClick={loadMore} />
      )}
    </div>
  );
};

export default MoviesPage;
