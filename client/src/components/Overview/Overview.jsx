import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ImageGallery from 'Overview/ImageGallery.jsx';
import ProductInformation from 'Overview/ProductInformation.jsx';
import StyleSelector from 'Overview/StyleSelector.jsx';
import AddToCart from 'Overview/AddToCart.jsx';
import testData from 'tests/testData.js';

function Overview({ productId }) {
  // const [product, setProduct] = useState({});
  // const [styles, setStyles] = useState([]);
  // const [selectedStyleId, setSelectedStyleId] = useState();
  //TODO: delete once data fetching is up
  const [product, setProduct] = useState(testData.product);
  const [styles, setStyles] = useState(testData.styles.results);
  const [selectedStyleId, setSelectedStyleId] = useState(1);

  useEffect(() => {
    // TODO: account for unmounting
    async function fetchData() {
      try {
        const [productResponse, stylesResponse] = await Promise.all([
          axios.get(`/products/${productId}`),
          axios.get(`/products/${productId}/styles`),
        ]);

        const sortedStyles = stylesResponse.data.results.sort(
          (style1, style2) => style1.styled_id - style2.styled_id
        );

        setProduct(productResponse.data);
        setStyles(sortedStyles);
        setSelectedStyleId(
          sortedStyles.find((style) => style['default?']).style_id
        );
      } catch (error) {
        // TODO: handle error
      }
    }

    // TODO: enable data fetching
    // fetchData();
  }, []);

  const selectedStyle = styles.find((style) => style.style_id === selectedStyleId);
  const handleStyleSelect = (styleId) => {
    setSelectedStyleId(styleId);
  };
  

  return (
    <div>
      <ImageGallery photos={selectedStyle.photos} />
      <ProductInformation
        product={product}
        selectedStyle={selectedStyle}
      />
      <StyleSelector
        styles={styles}
        selectedStyleId={selectedStyleId}
        handleStyleSelect={handleStyleSelect}
      />
      <AddToCart skus={selectedStyle.skus} />
    </div>
  );
}

Overview.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default Overview;
