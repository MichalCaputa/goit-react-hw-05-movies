import React, { useEffect, useState, useRef } from 'react';

import css from './Cast.module.css';
import { Options } from 'components/SearchOptions/SearchOptions';
import { useParams } from 'react-router-dom';
import { fetchMovies } from 'components/Api/Api';
const Cast = () => {
  const [movieCast, setMovieCast] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isFetched = useRef(false);
  const { movieId } = useParams();
  const imgPath = 'https://image.tmdb.org/t/p/w200/';
  const defaultPath =
    'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';
  const handleMoviesReviewsRequest = async (searchQuery, searchMode) => {
    setIsLoading(true);
    try {
      const fetchData = await fetchMovies(searchQuery, searchMode);
      const { data } = fetchData;
      console.log('response casts', fetchData);
      setMovieCast(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isFetched.current) {
      handleMoviesReviewsRequest(movieId, Options.CAST);
      console.log('casts', movieCast);
      isFetched.current = true;
    }
  });
  return (
    <div>
      {movieCast && !isLoading && isFetched.current && (
        <>
          <section>
            <ul className={css['cast-list']}>
              {movieCast.cast.map((cast, index) => (
                <li className={css['cast-item']} key={cast.id + index}>
                  {cast.profile_path && (
                    <img
                      className={css['cast-img']}
                      src={imgPath + cast.profile_path}
                      alt={cast.name}
                    />
                  )}
                  {!cast.profile_path && (
                    <img
                      className={css['cast-img']}
                      src={defaultPath}
                      alt={cast.name}
                    />
                  )}
                  <b>Character: {cast.character}</b>
                  <b>
                    Name:
                    {cast.name}
                  </b>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}{' '}
      {!movieCast && !isLoading && isFetched.current && (
        <p>Theres no data for that movie</p>
      )}
    </div>
  );
};
export default Cast;
