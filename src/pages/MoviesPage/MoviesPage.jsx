import clsx from 'clsx';
import s from './MoviesPage.module.css';
import { NavLink } from 'react-router-dom';
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage';

const MoviesPage = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  return (
    <div>
      <NavLink className={buildLinkClass} to="/">
        Home
      </NavLink>
      <NavLink className={buildLinkClass} to="/movies">
        Movies
      </NavLink>
      <MovieDetailsPage />
    </div>
  );
};

export default MoviesPage;
