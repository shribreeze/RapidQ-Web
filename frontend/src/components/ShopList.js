import React from 'react'
import CardComponent from './CardComponent'

const ShopList = () => {
  return (
    <>
      <div className="mx-4 mb-4 mt-5">
          <p className='display-5'>Food Outlets for you:</p>
      </div>

      <div className="container">
        <div className="row">
          {[...Array(8)].map((_, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
              <CardComponent
                imgSrc={`https://via.placeholder.com/150?text=Image+${index + 1}`}
                altText={`Example Image ${index + 1}`}
                cardText={`Quick example text for card ${index + 1} to build on the card title and make up the bulk of the card's content.`}
                />
            </div>
          ))} 
        </div>
      </div>
    </>
  )
}

export default ShopList