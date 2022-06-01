// may add a diffrent file for helfult/report buttons
import React, { useState } from 'react';
import styled from 'styled-components';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Stars from 'shared/Stars.jsx'
import axios from 'axios';

const StyledReview = styled.div`
  border: 2px solid black;
  margin: 10px;
`;
const Star = styled.div`
  padding-top: 10px;
  float: left;
  padding-left: 10px;
`;
const User = styled.p`
  padding-top: 10px;
  float: right;
  padding-right: 10px;
`;
const Title = styled.h2`
  padding-top: 15px;
  font-size: 150%;
`;
const Buttons = styled.button`
  background: none!important;
  border: none;
  cursor: pointer;
`;

function Review({ review }) {
  const [isDisabled, setIsDisabled] = useState(false);
  let date;
  let rec = '';
  const handleReviewClick = (e, type) => {
    setIsDisabled(true);
    axios.put(`/reviews/${review.review_id}/${type}`)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  const parseData = () => {
    date = formatDistanceToNow(parseISO(review.date));
    if (review.recommend) {
      rec = '✅';
    }
  };
  parseData();
  return (
    <StyledReview>
      <Star>
        <Stars value={review.rating} />
      </Star>
      <User>
        {`${rec} ${review.reviewer_name}, ${date} ago`}
      </User>
      <br />
      <Title>{review.summary}</Title>
      <br />
      <p>{review.body}</p>
      <Buttons disabled={isDisabled} onClick={(e) => handleReviewClick(e, 'helpful')}>
        {`Helpful? ${review.helpfulness}`}
      </Buttons>
      <Buttons type="button" onClick={(e) => handleReviewClick(e, 'report')}>| Report</Buttons>
    </StyledReview>
  );
}

export default Review;
