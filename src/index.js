import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { FilmApp } from 'components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={'/goit-react-hw-05-movies'}>
      <FilmApp />
    </BrowserRouter>
  </React.StrictMode>
);
