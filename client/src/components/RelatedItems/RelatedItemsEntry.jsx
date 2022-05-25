import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from './Modal.jsx';

// const Container = styled.div`
//   text-align: center;
// `;
const Container = styled.div`

`;

const Action = styled.button`
  position: static;
  top: 10px;
  right: 580px;
  width: 80px;
  height: 35px;
  background-color: #555;
  color: white;
  font-size: 15px;
  padding: 5px 5px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

function RelatedItemsEntry({ item }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <img
        src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        width="200"
        height="300"
        alt={`Thumbnail for related item ${item.name}`}
      />
      <Action type="button" onClick={() => setShowModal(true)}>
        Compare
      </Action>
      <Modal showModal={showModal} onClose={() => setShowModal(false)} />
      <div>
        {item.category}
      </div>
      <div>
        {item.default_price}
      </div>
    </Container>
  );
}

RelatedItemsEntry.propTypes = {
  // item: PropTypes.arrayOf(PropTypes.element).isRequired,
  item: PropTypes.object.isRequired,
  // size: PropTypes.number.isRequired,
};

export default RelatedItemsEntry;
