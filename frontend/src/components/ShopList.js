import React from 'react';
import CardComponent from './CardComponent';
import './ShopList.css';

const ShopList = () => {
  return (
    <>
      <div className="m-4">
        <p className='display-5'>Food Outlets for you:</p>
      </div>
      <div className="container">
        <div className="row" id='row'>
          <div className="col">
            <CardComponent
              imgSrc="/ShopPics/fast-food-cafe.jpeg"
              altText="Fast Food Cafe"
              cardText="Fast Food Cafe"
              hoverInfo="Fast Food Cafe: Open till 10 PM"
            />
          </div>
          <div className="col">
            <CardComponent
              imgSrc="/ShopPics/singhs-baker.jpeg"
              altText="Singh's Baker"
              cardText="Singh's Baker"
              hoverInfo="Singh's Baker: Best in town"
            />
          </div>
          <div className="col">
            <CardComponent
              imgSrc="/ShopPics/mohali-chaat-bhandar.jpeg"
              altText="Mohali Chaat Bhandar"
              cardText="Mohali Chaat Bhandar"
              hoverInfo="Mohali Chaat Bhandar: Famous for chaat"
            />
          </div>
          <div className="col">
            <CardComponent
              imgSrc="/ShopPics/sizziling-refreshment.jpeg"
              altText="Sizziling Refreshment"
              cardText="Sizziling Refreshment"
              hoverInfo="Sizziling Refreshment: Refreshing drinks"
            />
          </div>
          <div className="col">
            <CardComponent
              imgSrc="/ShopPics/punjabi-dhaba.jpeg"
              altText="Punjabi Dhaba"
              cardText="Punjabi Dhaba"
              hoverInfo="Punjabi Dhaba: Authentic Punjabi food"
            />
          </div>
          <div className="col">
            <CardComponent
              imgSrc="/ShopPics/bunkers-coffee.jpeg"
              altText="Bunkers Coffee"
              cardText="Bunkers Coffee"
              hoverInfo="Bunkers Coffee: Cozy place"
            />
          </div>
          <div className="col">
            <CardComponent
              imgSrc="/ShopPics/jass-pizza.jpeg"
              altText="Jass Pizza"
              cardText="Jass Pizza"
              hoverInfo="Jass Pizza: Delicious pizzas"
            />
          </div>
          <div className="col">
            <CardComponent
              imgSrc="/ShopPics/big-million.jpeg"
              altText="Big Million"
              cardText="Big Million"
              hoverInfo="Big Million: Great deals"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopList;
