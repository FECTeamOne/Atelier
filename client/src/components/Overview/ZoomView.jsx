import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from 'shared/Button.jsx';
import ImageButton from 'shared/ImageButton.jsx';

function ZoomView({ imageUrl, imageDimensions, initialCoords, onZoomClose }) {
  const [mouseCoords, setMouseCoords] = useState(initialCoords);
  const [windowDimensions, setWindowDimensions] = useState({
    x: window.innerWidth,
    y: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        x: window.innerWidth,
        y: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouseCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('pointermove', handleMouseMove);
    return () => {
      window.removeEventListener('pointermove', handleMouseMove);
    };
  }, []);

  const calculateImageTranslation = (dimension) => {
    if (windowDimensions[dimension] > imageDimensions[dimension]) {
      return '50%';
    }

    const maxImageCoordinate = imageDimensions[dimension] - windowDimensions[dimension];
    const relativeCoordinate = mouseCoords[dimension] / windowDimensions[dimension];
    const imageCoordinate = relativeCoordinate * maxImageCoordinate;
    return `-${imageCoordinate}px`;
  };

  // TODO: use event data from click that opened ZoomView to set initial position
  return (
    <div>
      <img
        onClick={onZoomClose}
        src={imageUrl}
        aria-label={`Current style zoomed view`}
        style={{
          width: `${imageDimensions.x}px`,
          transform: `translate(${calculateImageTranslation('x')}, ${calculateImageTranslation('y')})`,
          transformOrigin: 'top left'
        }}
      />
    </div>
  )
}

export default ZoomView;
