import { useEffect, useState } from 'react';
import { fetchMovieById } from '../../services/api';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const params = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieById(params.movieId).then((data) => setMovie(data));
  }, [params.movieId]);

  return (
    <div>
      <p>Movie details #{params.movieId}</p>
      <p>{movie}</p>
    </div>
  );
};

export default MovieDetailsPage;
