import React from 'react';

const CardComponent = ({ imgSrc, altText, cardText }) => {
  return (
    <div className="card" style={{ width: '18rem', margin: '10px' }}>
      <img src={imgSrc} className="card-img-top" alt={altText} />
      <div className="card-body">
        <p className="card-text">{cardText}</p>
      </div>
    </div>
  );
}

export default CardComponent;