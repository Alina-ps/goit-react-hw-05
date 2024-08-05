import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/api';
import s from './MovieCast.module.css';

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
      <ul className={s.list}>
        {cast.map((item) => (
          <li className={s.listItem} key={item.id}>
            <img
              src={
                item.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                  : 'https://via.placeholder.com/200x300?text=No+Image+Available'
              }
              alt={item.name}
              width={100}
            />
            <p className={s.itemText}>
              {item.name} <span className={s.span}>({item.character})</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
