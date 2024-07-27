import React from 'react'
import CardComponent from './CardComponent'

const ShopList = () => {
  return (
    <>
        <div className="m-4">
            <p className='display-5'>Food Outlets for you:</p>
        </div>
        <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-3">
          <CardComponent
            imgSrc="https://via.placeholder.com/150"
            altText="Example Image 1"
            cardText="Some quick example text to build on the card title and make up the bulk of the card's content."
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <CardComponent
            imgSrc="https://via.placeholder.com/150"
            altText="Example Image 2"
            cardText="Another quick example text to build on the card title and make up the bulk of the card's content."
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <CardComponent
            imgSrc="https://via.placeholder.com/150"
            altText="Example Image 3"
            cardText="Yet another quick example text to build on the card title and make up the bulk of the card's content."
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <CardComponent
            imgSrc="https://via.placeholder.com/150"
            altText="Example Image 4"
            cardText="A different quick example text to build on the card title and make up the bulk of the card's content."
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <CardComponent
            imgSrc="https://via.placeholder.com/150"
            altText="Example Image 5"
            cardText="Some more quick example text to build on the card title and make up the bulk of the card's content."
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <CardComponent
            imgSrc="https://via.placeholder.com/150"
            altText="Example Image 6"
            cardText="Even more quick example text to build on the card title and make up the bulk of the card's content."
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <CardComponent
            imgSrc="https://via.placeholder.com/150"
            altText="Example Image 7"
            cardText="Another one quick example text to build on the card title and make up the bulk of the card's content."
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <CardComponent
            imgSrc="https://via.placeholder.com/150"
            altText="Example Image 8"
            cardText="The last quick example text to build on the card title and make up the bulk of the card's content."
          />
        </div>
      </div>
    </div>
    </>
  )
}

export default ShopList