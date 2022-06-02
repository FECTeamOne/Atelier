import React from 'react';
import styled from 'styled-components';
import Navbar from 'App/Navbar.jsx';
import Reviews from 'Reviews/Reviews.jsx';
import Overview from 'Overview/Overview.jsx';
import RelatedItems from 'RelatedItems/RelatedItems.jsx';
import GlobalStyle from '../../globalStyles.js';
import { StarIconFills } from 'assets/StarIcon.jsx';

function App() {
  return (
    <>
      <StarIconFills />
      <GlobalStyle />
      <Wrapper>
        <Navbar />
        <Overview productId={40344} />
        <Reviews productId={40344} />
        <RelatedItems productId={40344} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin:auto;
  width: fit-content;
`;

export default App;
