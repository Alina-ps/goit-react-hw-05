import { Suspense, useEffect, useRef, useState } from 'react';
import { fetchMovieById } from '../../services/api';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import s from './MovieDetailsPage.module.css';
import clsx from 'clsx';
import Loader from '../../components/Loader/Loader';

const MovieDetailsPage = () => {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const goBackRef = useRef(location?.state || '/movies');
  const [isLoading, setIsLoading] = useState(false);

  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  useEffect(() => {
    const getMovieById = async () => {
      setIsLoading(true);
      try {
        const response = await fetchMovieById(params.movieId);
        setMovie(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieById();
  }, [params.movieId]);

  if (isLoading || !movie) {
    return <Loader />;
  }

  return (
    <div className={s.container}>
      <Link to={goBackRef.current}>Go back</Link>
      <div className={s.movieContainer}>
        <img
          className={s.img}
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          width={200}
          height={300}
        />
        <div className={s.textContainer}>
          <h3>
            {movie.original_title} ({movie.release_date.slice(0, 4)})
          </h3>
          <div className={s.textRow}>
            <h4>Overview:</h4>
            <p>{movie.overview}</p>
          </div>
          <div className={s.textRow}>
            <h4>Country:</h4>
            <p>{movie.origin_country}</p>
          </div>
          <div className={s.textRow}>
            <h4>Duration:</h4>
            <p>{movie.runtime} min</p>
          </div>
          <div className={s.textRow}>
            <h4> Genres:</h4>
            <ul className={s.list}>
              {movie.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={s.additionalInfo}>
        <h4>Additional information</h4>
        <NavLink className={buildLinkClass} to="cast">
          Cast
        </NavLink>
        <NavLink className={buildLinkClass} to="reviews">
          Reviews
        </NavLink>
      </div>
      <Suspense fallback={<h2>Second suspense loader</h2>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
