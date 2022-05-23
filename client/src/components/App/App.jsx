import React from 'react';
import styled, { css } from 'styled-components';
import Reviews from 'Reviews/Reviews.jsx';
import Overview from 'Overview/Overview.jsx';

const Container = styled.div`
  text-align: center;
`;

function App() {
  return (
    <Container>
      <Overview productId={11}/>
      <Reviews />
    </Container>
  );
}

export default App;
