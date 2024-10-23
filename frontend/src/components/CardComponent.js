import React from 'react';
import './CardComponent.css';

const CardComponent = ({ imgSrc, altText, cardText, hoverInfo, shopcount }) => {
  return (
    <div className="card-cp">
      <div className="card-img-container-cp">
        <img src={imgSrc} className="card-img-top-cp" alt={altText} />
        <div className="card-info-cp">
          <p className="card-info-text-cp">{hoverInfo}</p>
          <button className="card-info-button-cp">Learn More</button>
        </div>
      </div>
      <div className="card-body-cp">
        <p className="card-text-cp">{cardText}</p>
        {/* Display the paid order count */}
        <p className="card-text-cp"> Accepted Orders: {shopcount}</p>
      </div>
    </div>
  );
};

export default CardComponent;
