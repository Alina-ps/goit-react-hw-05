import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <div className={s.header}>
      <NavLink className={buildLinkClass} to="/">
        Home
      </NavLink>
      <NavLink className={buildLinkClass} to="/movies">
        Movies
      </NavLink>
    </div>
  );
};

export default Header;
