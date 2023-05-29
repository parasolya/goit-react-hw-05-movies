import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMoviesByName } from '../../components/loadAPI';
import css from './Movies.module.css';

export default function Movies() {
  const [searchMovies, setSearchMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const movieName = searchParams.get('query');

  const [query, setQuery] = useState(() => movieName || '');

  const location = useLocation();

  useEffect(() => {
    const fetchSearchList = async () => {
      try {
        setLoading(true);
        const arraySearch = await getMoviesByName(movieName);
        setSearchMovies(arraySearch);

        setLoading(false);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    if (movieName) {
      fetchSearchList();
    }
  }, [movieName]);

  const updateSearchString = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ query: query });
  };

  return (
    <div className={css.page__section}>
      <h2>Search movies:</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={updateSearchString} />
        <button type="submit" className={css.submit__btn}>
          Search
        </button>
      </form>

      <ul>
        {movieName ? (
          loading ? (
            'Loading...'
          ) : searchMovies.length > 0 ? (
            searchMovies.map(el => (
              <li key={el.id}>
                <Link
                  className={css.nav__link}
                  state={{ from: location }}
                  to={`/movies/${el.id}`}
                >
                  {el.title}
                </Link>
              </li>
            ))
          ) : (
            <p>No movies found. Try entering another title</p>
          )
        ) : (
          <p></p>
        )}
      </ul>
    </div>
  );
}
