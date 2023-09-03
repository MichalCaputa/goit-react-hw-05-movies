import React, { lazy } from 'react';

import { Routes, Route, redirect } from 'react-router-dom';
import axios from 'axios';
redirect('/');
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const Home = lazy(() => import('pages/Home'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));
const Reviews = lazy(() => import('components/Reviews/Reviews'));
const Cast = lazy(() => import('components/Cast/Cast'));
const NotFound = lazy(() => import('pages/NotFound'));
const Movie = lazy(() => import('pages/Movie'));

//
export const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path={'/'} element={<Home />} />
      <Route path={'/movies'} element={<Movie />} />
      <Route path={'/movies/:movieId'} element={<MovieDetails />}>
        <Route path={'cast'} element={<Cast />} />
        <Route path={'reviews'} element={<Reviews />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
