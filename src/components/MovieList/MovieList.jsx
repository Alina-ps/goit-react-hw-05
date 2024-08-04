import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ movies = [] }) => {
  const location = useLocation();

  return (
    <div>
      <h2>Trending</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={movie.id.toString()} state={location}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
