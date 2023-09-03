import React, { useEffect, useState, useRef } from 'react';

import { Options } from 'components/SearchOptions/SearchOptions';
import { useParams } from 'react-router-dom';
import { fetchMovies } from 'components/Api/Api';

const Reviews = () => {
  const [movieReviews, setmovieReviews] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isFetched = useRef(false);
  const { movieId } = useParams();
  const id = Number(movieId);
  const handleMoviesReviewsRequest = async (searchQuery, searchMode) => {
    setIsLoading(true);
    try {
      const fetchData = await fetchMovies(searchQuery, searchMode);
      const { data } = fetchData;
      console.log('response rewiews', fetchData);
      setmovieReviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isFetched.current) {
      handleMoviesReviewsRequest(id, Options.REVIEWS);
      isFetched.current = true;
    }
  });
  return (
    <div>
      {movieReviews.results?.length > 0 && !isLoading && isFetched.current && (
        <>
          <ul>
            {movieReviews.results?.map((review, index) => (
              <li key={index}>
                <h6>{review.author}</h6>
                <p>{review.content}</p>
                <p>{review.created_at}</p>
              </li>
            ))}
          </ul>
        </>
      )}
      {movieReviews.results?.length === 0 &&
        !isLoading &&
        isFetched.current && (
          <>
            <p>Sorry We doon't have any reviews for this movie</p>
          </>
        )}
    </div>
  );
};
export default Reviews;
