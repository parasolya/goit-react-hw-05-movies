import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../loadAPI';
import css from './Cast.module.css';

export default function Cast() {
  const [actors, setActors] = useState(null);
  const [loading, setLoading] = useState(true);

  const { movieId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const cast = await fetchMovieCast(movieId);
        setActors(cast);
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
      ) : actors && actors.length > 0 ? (
        <div>
          <ul>
            {actors.map(({ name, character, profile_path, id }) => (
              <li key={id}>
                {/* {profile_path && (
                      <img
                        className={css.listImg}
                        alt={name}
                        src={`https://image.tmdb.org/t/p/w92${profile_path}`}
                      />
                    )} */}
                {profile_path ? (
                  <img
                    alt={name}
                    src={`https://image.tmdb.org/t/p/w92${profile_path}`}
                  />
                ) : (
                  <p className={css.text__no}>No image</p>
                )}

                <p className={css.actor}>{name}</p>
                <p className={css.text}>{character}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No found</p>
      )}
    </div>
  );
}
