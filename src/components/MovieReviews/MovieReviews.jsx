import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReview } from '../../services/api';
import s from './MovieReviews.module.css';

const MovieReviews = () => {
  const params = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        const response = await fetchMovieReview(params.movieId);
        setReviews(response);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieReviews();
  }, [params.movieId]);

  return (
    <div>
      <ul className={s.list}>
        {reviews.map((item) => (
          <li className={s.listItem} key={item.id}>
            <p className={s.itemText}>Author: {item.author_details.username}</p>
            <p className={s.itemComment}>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
