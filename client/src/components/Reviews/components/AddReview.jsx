import React, { useState } from 'react';
import styled from 'styled-components';
import Stars from 'shared/Stars.jsx'
import axios from 'axios';

// TODO Change this to be the modal styles to make it a popup window
const Modal = styled.div`
  min-height: 400px;
`;
const CloseButton = styled.button`
  background: none!important;
  border: none;
  padding: 0!important;
  cursor: pointer;
  text-align: right;
  font-size: 36px;
  margin-left: 90%;
  `;
const Image = styled.img`
  height: 50px;
  width: 35px;
`;
const StyledStars = styled.div`
  margin: auto;
  width: 60px;
`;

const data = {
  Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too big'],
  Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
  Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
  Quality: ['Poor', 'Bewlow average', 'What I expected', 'Pretty great', 'Perfect'],
  Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
  Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
};
const starsMeaning = ['Poor', 'Fair', 'Average', 'Good', 'Great'];

function AddReview({ handleModalToggle, allCharacteristics, productId }) {
  const productCharacteristics = Object.keys(allCharacteristics);
  const [isRecommended, setIsRecommended] = useState(false);
  const [rating, setRating] = useState(null);
  const [img, setImg] = useState([]);
  const [submissonErr, setSubmissonErr] = useState(false);
  const [reviewText, setReviewText] = useState({
    summary: '',
    body: '',
    name: '',
    email: '',
  });
  const [characteristics, setCharacteristics] = useState({
    Size: null,
    Width: null,
    Comfort: null,
    Quality: null,
    Length: null,
    Fit: null,
  });

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  }
  function handleReviewSubmit(e) {
    e.preventDefault();
    setSubmissonErr(false);
    const characteristicSubmit = {};
    const keysArray = Object.keys(allCharacteristics);
    keysArray.forEach((key) => {
      characteristicSubmit[allCharacteristics[key].id] = characteristics[key];
    });
    const submittedData = {
      ...reviewText,
      product_id: Number(productId),
      rating: Number(rating),
      recommend: isRecommended,
      characteristics: characteristicSubmit,
      photos: [],
    };
    console.log(submittedData);
    if (submittedData.email.search(/^\S+@\S+\.\S+$/) === -1) {
      setSubmissonErr(true);
    } else {
      axios.post('/reviews', submittedData)
        .then(() => handleModalToggle())
        .catch((err) => console.log(err));
    }
  }
  const handleFile = async (e) => {
    if (img.length > 4) {
      alert('too many photos');
      return;
    }
    try {
      const file64 = await getBase64(e.target.files[0]);
      let body = new FormData();
      body.append('image', file64);
      const results = await axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload?key=fe7a3df7bca50228ca58e71e62ad33f7',
        data: body,
      });
      const url = results.data.data.display_url;
      const arr = [...img];
      arr.push(url);
      setImg(arr);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal>
      <CloseButton type="button" onClick={handleModalToggle}>X</CloseButton>
      <StyledStars>
        <Stars
          value={Number(rating)}
          interactive
          onClick={(e) => setRating(e.currentTarget.value)}
        />
        {starsMeaning[rating - 1]}
      </StyledStars>
      <div>
        do you recommend this product?
        <label htmlFor="1">
          <input id="1" type="radio" value="yes" checked={isRecommended} onChange={() => setIsRecommended(!isRecommended)} />
          yes
        </label>
        <label htmlFor="2">
          <input id="2" type="radio" value="no" checked={!isRecommended} onChange={() => setIsRecommended(!isRecommended)} />
          no
        </label>
      </div>
      <div className="Characteristics">
        {productCharacteristics.map((characteristic) => (
          <>
            {characteristic}
            <div>
              <div>
                {characteristics[characteristic] ? data[characteristic][characteristics[characteristic] - 1] : 'None selected' }
              </div>
              {[...Array(5)].map((e, j) => {
                const val = j + 1;
                return (
                  <label>
                    <input
                      type="radio"
                      value={val}
                      checked={val === characteristics[characteristic]}
                      onChange={() => {
                        const newstate = { ...characteristics };
                        newstate[characteristic] = val;
                        setCharacteristics(newstate);
                      }}
                    />
                    {j + 1}
                  </label>
                );
              })}
            </div>
          </>
        ))}
      </div>
      <div>
        <form onSubmit={handleReviewSubmit}>
          <div>
            Summary
            <input
              type="textarea"
              onChange={(e) => {
                const temp = { ...reviewText };
                temp.summary = e.target.value;
                setReviewText(temp);
              }}
              placeholder="Example: Best purchase ever!"
            />
          </div>
          <div>
            Review
            <input
              type="textarea"
              placeholder="Why did you like the product or not?"
              onChange={(e) => {
                const temp = { ...reviewText };
                temp.body = e.target.value;
                setReviewText(temp);
              }}
            />
          </div>
          {reviewText.body.length <= 50 ? `Minimum required characters left ${50 - reviewText.body.length}` : 'Minimum reached'}
          <div>
            <input type="file" onChange={handleFile} />
            {img.map((current) => <Image src={current} alt="img upload" />)}
          </div>
          <div>
            name
            <input
              type="textarea"
              placeholder="Example: jackson11!"
              onChange={(e) => {
                const temp = { ...reviewText };
                temp.name = e.target.value;
                setReviewText(temp);
              }}
            />
          </div>
          For privacy reasons, do not use your full name or email address
          <div>
            Email
            <input
              type="textarea"
              placeholder="Example: jackson11@email.com"
              onChange={(e) => {
                const temp = { ...reviewText };
                temp.email = e.target.value;
                setReviewText(temp);
              }}
            />
          </div>
          {submissonErr ? <div>Error in submisson, check all feilds and try again</div> : ''}
          <input type="submit" />
        </form>
      </div>
    </Modal>
  );
}

export default AddReview;
