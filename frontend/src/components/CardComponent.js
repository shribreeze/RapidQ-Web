import React from 'react';
import './CardComponent.css';

const CardComponent = ({ imgSrc, altText, cardText, hoverInfo }) => {
  return (
    <div className="card">
      <div className="card-img-container">
        <img src={imgSrc} className="card-img-top" alt={altText} />
        <div className="card-info">
          <p className="card-info-text">{hoverInfo}</p>
          <button className="card-info-button">Learn More</button>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">{cardText}</p>
      </div>
    </div>
  );
};

export default CardComponent;
