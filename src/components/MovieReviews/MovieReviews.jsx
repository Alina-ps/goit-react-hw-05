import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReview } from '../../services/api';

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
      <h3>Reviews</h3>
      <ul>
        {reviews.map((item) => (
          <li key={item.id}>
            <p>Author: {item.author_details.username}</p>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
