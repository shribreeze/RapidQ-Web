import React from 'react';
import './CardComponent.css';

const CardComponent = ({ imgSrc, altText, cardText, hoverInfo }) => {
  return (
    <div className="card">
      <img src={imgSrc} className="card-img-top" alt={altText} />
      <div className="card-info">
        <p>{hoverInfo}</p>
      </div>
      <div className="card-body">
        <p className="card-text">{cardText}</p>
      </div>
    </div>
  );
};

export default CardComponent;
