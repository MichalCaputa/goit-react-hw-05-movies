import React from 'react';
import { Suspense } from 'react';
import { Container, Header, Link, Logo } from 'components/AppStyled/App.styled';

export const Layout = ({ children }) => {
  return (
    <Container>
      <Header>
        <Logo>
          <span role="img" aria-label="camera icon">
            🎥
          </span>{' '}
          Film APP
        </Logo>
        <nav>
          <Link to="/" end>
            Home
          </Link>
          <Link to="/movies">Movies</Link>
        </nav>
      </Header>
      <Suspense fallback={<div>Loading page...</div>}>{children}</Suspense>
    </Container>
  );
};
