import React, { useEffect, useState, useRef } from 'react';
import css from './Home.module.css';
import { Options } from 'components/SearchOptions/SearchOptions';
import { fetchMovies } from 'components/Api/Api';
import { Link } from 'components/AppStyled/App.styled';
import { useLocation } from 'react-router-dom';
export const TrendingMovies = () => {
  const location = useLocation();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFetched = useRef(false);
  const imgPath = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/';
  const handleMoviesRequest = async (searchQuery, pageNr) => {
    setIsLoading(true);
    try {
      const fetchData = await fetchMovies(searchQuery, pageNr);
      const { results } = fetchData.data;

      setTrendingMovies(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isFetched.current) {
      handleMoviesRequest('', Options.TRENDING);

      isFetched.current = true;
    }
  });
  return (
    <div>
      <div>Trending Today</div>
      {!isLoading && trendingMovies.length > 0 && isFetched.current > 0}
      <ul className={css['item-list']}>
        {trendingMovies.map(movie => (
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <li className={css['item']} key={movie.id?.toString()}>
              <img
                className={css['item-img']}
                src={imgPath + movie.poster_path}
                alt={movie.title}
              ></img>
              {movie.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
