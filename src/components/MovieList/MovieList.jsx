import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ movies = [] }) => {
  const location = useLocation();

  return (
    <div>
      <ul className={s.list}>
        {movies.map((movie) => (
          <li className={s.listItem} key={movie.id}>
            <Link to={`/movies/${movie.id.toString()}`} state={location}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : 'https://via.placeholder.com/200x300?text=No+Image+Available'
                }
                alt={movie.title}
                width={200}
                height={300}
              />

              <p className={s.rating}>
                <span className={s.span} role="img" aria-label="star">
                  ⭐
                </span>
                {Math.round(movie.vote_average * 10) / 10}
              </p>

              <p className={s.itemText}>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
