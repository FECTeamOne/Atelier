import React from 'react';
import styled from 'styled-components';
import GlobalStyle from '../../globalStyles.js';
import Navbar from 'App/Navbar.jsx';
import Reviews from 'Reviews/Reviews.jsx';
import Overview from 'Overview/Overview.jsx';
import RelatedItemsList from 'RelatedItems/RelatedItemsList.jsx'

const Wrapper = styled.div`
  margin:auto;
  width: fit-content;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Navbar />
        <Overview productId={40344}/>
        {/*<Reviews />*/}
        {/*<RelatedItemsList />*/}
      </Wrapper>
    </>
  );
}

export default App;
