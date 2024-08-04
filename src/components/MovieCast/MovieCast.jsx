import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/api';

const MovieCast = () => {
  const params = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        const response = await fetchMovieCast(params.movieId);
        setCast(response);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieCast();
  }, [params.movieId]);

  return (
    <div>
      <h3>Cast</h3>
      <ul>
        {cast.map((item) => (
          <li key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
              alt={item.name}
              width={50}
            />
            <p>
              {item.name} as {item.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
