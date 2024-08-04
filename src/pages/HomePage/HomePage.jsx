import { useEffect, useState } from 'react';
import fetchTrendingMovies from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import s from './HomePage.module.css';

const HomePage = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then((data) => setMovies(data));
  }, []);

  return (
    <div>
      <NavLink className={buildLinkClass} to="/">
        Home
      </NavLink>
      <NavLink className={buildLinkClass} to="/movies">
        Movies
      </NavLink>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
