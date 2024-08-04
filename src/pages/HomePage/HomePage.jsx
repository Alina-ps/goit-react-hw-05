import { useEffect, useState } from 'react';
import fetchTrendingMovies from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import s from './HomePage.module.css';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import Loader from '../../components/Loader/Loader';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTrendingMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetchTrendingMovies(page);
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

    getTrendingMovies();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h2>Trending today</h2>
      <MovieList movies={movies} />
      {isLoading && <Loader />}
      {total > movies.length && !isLoading && (
        <LoadMoreBtn onClick={loadMore} />
      )}
    </div>
  );
};

export default HomePage;
