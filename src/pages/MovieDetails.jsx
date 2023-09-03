import React, { useEffect, useState, useRef } from 'react';
import { BackLink } from 'components/BackLink/BackLink';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Options } from 'components/SearchOptions/SearchOptions';
import { useParams } from 'react-router-dom';
import { fetchMovies } from 'components/Api/Api';

const MovieDetails = () => {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/movies';
  const imgPath = 'https://image.tmdb.org/t/p/w500/';
  const [movieDetail, setTrendingMovies] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isFetched = useRef(false);
  const { movieId } = useParams();
  const id = Number(movieId);
  const handleMoviesRequest = async (searchQuery, searchMode) => {
    setIsLoading(true);
    try {
      const fetchData = await fetchMovies(searchQuery, searchMode);
      const { data } = fetchData;

      setTrendingMovies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isFetched.current) {
      handleMoviesRequest(id, Options.DETAILS);

      isFetched.current = true;
    }
  });
  return (
    <div>
      <>
        <BackLink to={backLinkHref}>Back to movies</BackLink>
      </>
      {movieDetail && !isLoading && isFetched.current && (
        <>
          <img
            src={imgPath + movieDetail.backdrop_path}
            alt={movieDetail.original_title}
          ></img>
          <h1>{movieDetail.original_title}</h1>
          <p>
            User score: {Math.round((movieDetail.vote_average / 10) * 100)}%
          </p>
          <h3>Overview</h3>
          <p>{movieDetail.overview}</p>
          <h3>Genres</h3>
          <p>
            {movieDetail.genres?.map((genre, index) => (
              <span key={index + 100}>{genre.name} </span>
            ))}
          </p>
        </>
      )}
      <ul>
        <>Additional information</>
        <li>
          <Link to="cast" state={{ from: location.state.from }}>
            Check the credits
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: location.state.from }}>
            Read some rewiews...
          </Link>
        </li>
      </ul>
      <Outlet />
      {!movieDetail && !isLoading && <h2>Sorry, project not found</h2>}
    </div>
  );
};
export default MovieDetails;
