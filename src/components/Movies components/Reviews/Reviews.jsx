import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../loadAPI';
import css from './Reviews.module.css';

export default function Reviews() {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);

  const { movieId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const results = await fetchMovieReviews(movieId);
        setReviews(results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);
  return (
    <div>
      {loading ? (
        'Loading...'
      ) : reviews && reviews.length > 0 ? (
        <div>
          <ul>
            {reviews.map(({ author, content, id }) => (
              <li className={css.text} key={id}>
                <p className={css.autor}>{author}</p>
                {content && content}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={css.text__no}>No reviews found</p>
      )}
    </div>
  );
}
