import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import css from './MovieSearch.module.css';
import { Options } from 'components/SearchOptions/SearchOptions';
import { fetchMovies } from 'components/Api/Api';
import { Link } from 'components/AppStyled/App.styled';
export const MovieSearch = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFetching = useRef(false);
  const imgPath = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/';
  const handleMoviesRequest = async (searchQuery, pageNr) => {
    setIsLoading(true);
    try {
      const fetchData = await fetchMovies(searchQuery, pageNr);
      const { results } = fetchData.data;

      setMovies(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!query) return;
    if (!isFetching.current) {
      isFetching.current = true;
      handleMoviesRequest(query, Options.QUERY);
      isFetching.current = false;
    }
  }, [query]);
  const handleChange = e => {
    e.preventDefault();
    const query = e.target.value;
    setSearchParams({ query: query });
  };
  return (
    <div>
      {' '}
      <input type={'text'} onChange={handleChange} />
      {!isLoading && movies.length > 0 && (
        <ul className={css['item-list']}>
          {movies.map(movie => (
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              <li className={css['item']} key={movie.id?.toString()}>
                {movie.poster_path && (
                  <img
                    className={css['item-img']}
                    src={imgPath + movie.poster_path}
                    alt={movie.title}
                  ></img>
                )}{' '}
                {!movie.poster_path && (
                  <img
                    className={css['item-img']}
                    src={
                      'https://media.comicbook.com/files/img/default-movie.png'
                    }
                    alt={movie.title}
                  ></img>
                )}
                {movie.title}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};
