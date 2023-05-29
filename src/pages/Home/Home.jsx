import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../components/loadAPI';
import css from './Home.module.css'

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
        setLoading(false);
      } catch (e) {
        console.log(e);
        //     .catch(error => {
        //         console.log(error);
        //         // Notiflix.Report.failure(
        //         //   'Sorry, there are no images matching your search query. Please try again.'
        //         // );
      }
    };
    fetchData();
  }, []);

  return (
    <div className={css.page__section}>
      <h1>Trending movies:</h1>
      <ul>
        {loading
          ? 'Loading...'
          : trendingMovies.map(el => {
              return (
                <li key={el.id}>
                  <Link className={css.nav__link} to={`/movies/${el.id}`} state={{ from: location }}>
                    {el.title}
                  </Link>
                </li>
              );
            })}
      </ul>
    </div>
  );
}
