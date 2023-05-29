import { Link, Outlet, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetails } from '../../components/loadAPI';
import css from './MovieDetails.module.css';

export default function MovieDetails() {
  const [objectMovie, setObjectMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const objectMovie = await getMovieDetails(movieId);
        setObjectMovie(objectMovie);
        setLoading(false);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails(movieId);
  }, [movieId]);

  const getYear = releaseDate => {
    const date = new Date(releaseDate);
    return date.getFullYear();
  };
  const getGenres = arrGenres => {
    return arrGenres.map(genre => genre.name).join(', ');
  };

  const location = useLocation();
  const cameBack = location.state?.from ?? '/';
  return (
    <div className={css.page__section}>
      <div className={css.btn}>
        <Link className={css.link} to={cameBack}>
          Go Back
        </Link>
      </div>

      {loading ? (
        'Loading...'
      ) : (
        <>
          <div className={css.details}>
            {objectMovie.poster_path ? (
              <img
                className={css.img}
                alt={objectMovie.original_title}
                src={`https://image.tmdb.org/t/p/w500${objectMovie.poster_path}`}
              />
            ) : (
              <img src={'noMovieImg'} alt="not available" />
            )}

            <div>
              <h1>
                {objectMovie.original_title} (
                {getYear(objectMovie.release_date)})
              </h1>
              <p>User Score: {~~(objectMovie.vote_average * 10)}%</p>
              <p>Overview</p>
              <p className={css.text}>{objectMovie.overview}</p>
              <p>Genres</p>
              <p className={css.text}>{getGenres(objectMovie.genres)}</p>
            </div>
          </div>
          <div>
            <ul className={css.list}>
              <li className={css.btn}>
                <Link className={css.link} to="cast" state={{ from: cameBack }}>
                  Cast
                </Link>
              </li>
              <li className={css.btn}>
                <Link
                  className={css.link}
                  to="reviews"
                  state={{ from: cameBack }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </>
      )}
    </div>
  );
}
