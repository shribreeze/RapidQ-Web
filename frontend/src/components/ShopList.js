import React from 'react';
import { Link } from 'react-router-dom';
import CardComponent from './CardComponent';
import './ShopList.css';

const shops = [
  {
    id: 1,
    imgSrc: "/ShopPics/fast-food-cafe.jpeg",
    altText: "Fast Food Cafe",
    cardText: "Fast Food Cafe",
    hoverInfo: "Fast Food Cafe: Open till 10 PM"
  },
  {
    id: 2,
    imgSrc: "/ShopPics/singhs-baker.jpeg",
    altText: "Singh's Baker",
    cardText: "Singh's Baker",
    hoverInfo: "Singh's Baker: Best in town"
  },
  {
    id: 3,
    imgSrc: "/ShopPics/mohali-chaat-bhandar.jpeg",
    altText: "Mohali Chaat Bhandar",
    cardText: "Mohali Chaat Bhandar",
    hoverInfo: "Mohali Chaat Bhandar: Famous for chaat"
  },
  {
    id: 4,
    imgSrc: "/ShopPics/sizziling-refreshment.jpeg",
    altText: "Sizziling Refreshment",
    cardText: "Sizziling Refreshment",
    hoverInfo: "Sizziling Refreshment: Refreshing drinks"
  },
  {
    id: 5,
    imgSrc: "/ShopPics/punjabi-dhaba.jpeg",
    altText: "Punjabi Dhaba",
    cardText: "Punjabi Dhaba",
    hoverInfo: "Punjabi Dhaba: Authentic Punjabi food"
  },
  {
    id: 6,
    imgSrc: "/ShopPics/bunkers-coffee.jpeg",
    altText: "Bunkers Coffee",
    cardText: "Bunkers Coffee",
    hoverInfo: "Bunkers Coffee: Cozy place"
  },
  {
    id: 7,
    imgSrc: "/ShopPics/jass-pizza.jpeg",
    altText: "Jass Pizza",
    cardText: "Jass Pizza",
    hoverInfo: "Jass Pizza: Delicious pizzas"
  },
  {
    id: 8,
    imgSrc: "/ShopPics/big-million.jpeg",
    altText: "Big Million",
    cardText: "Big Million",
    hoverInfo: "Big Million: Great deals"
  }
];

const ShopList = () => {
  return (
    <>
      <div className="m-4">
        <p className='display-5'>Food Outlets for you:</p>
      </div>
      <div className="container">
        <div className="row" id='row'>
          {shops.map((shop) => (
            <div className="col" key={shop.id}>
              <Link to={`/shop/${shop.id}`}>
                <CardComponent
                  imgSrc={shop.imgSrc}
                  altText={shop.altText}
                  cardText={shop.cardText}
                  hoverInfo={shop.hoverInfo}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopList;
