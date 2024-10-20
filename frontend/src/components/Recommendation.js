import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Recommendation.css';

const Recommendation = () => {
  const navigate = useNavigate();

  // Function to handle the click event on a category
  const handleCategoryClick = (category) => {
    navigate(`/dishes/${category}`);
  };

  return (
    <>
      <div className="mx-4 mt-5">
        <p className="display-5">Popular Dishes:</p>
      </div>

      <div className="container-fluid">
        <div className="scrolling-wrapper row flex-row flex-nowrap mt-4 mx-0 pb-4 pt-2">
          <div className="col-auto" onClick={() => handleCategoryClick('Sandwich')}>
            <div className="card card-block card-1"></div>
          </div>
          <div className="col-auto" onClick={() => handleCategoryClick('Tandoori Chicken')}>
            <div className="card card-block card-2"></div>
          </div>
          <div className="col-auto" onClick={() => handleCategoryClick('Shakes')}>
            <div className="card card-block card-3"></div>
          </div>
          <div className="col-auto" onClick={() => handleCategoryClick('Roll')}>
            <div className="card card-block card-4"></div>
          </div>
          <div className="col-auto" onClick={() => handleCategoryClick('Chhole Samose')}>
            <div className="card card-block card-5"></div>
          </div>
          <div className="col-auto" onClick={() => handleCategoryClick('Noodles')}>
            <div className="card card-block card-6"></div>
          </div>
          <div className="col-auto" onClick={() => handleCategoryClick('Burger')}>
            <div className="card card-block card-7"></div>
          </div>
          <div className="col-auto" onClick={() => handleCategoryClick('Fried Rice')}>
            <div className="card card-block card-8"></div>
          </div>
          <div className="col-auto" onClick={() => handleCategoryClick('Omelette')}>
            <div className="card card-block card-9"></div>
          </div>
          <div className="col-auto" onClick={() => handleCategoryClick('Veg Thali')}>
            <div className="card card-block card-10"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recommendation;
