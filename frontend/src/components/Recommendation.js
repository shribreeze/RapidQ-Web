import React from 'react'
import './Recommendation.css';

const Recommendation = () => {
  return (
    <>
        <div className="mx-4 mt-5">
            <p className='display-5'>Popular Dishes:</p>
        </div>

        <div class="container-fluid">
            <div class="scrolling-wrapper row flex-row flex-nowrap mt-4 mx-0 pb-4 pt-2">
                <div class="col-auto">
                <div class="card card-block card-1"></div>
                </div>
                <div class="col-auto">
                <div class="card card-block card-2"></div>
                </div>
                <div class="col-auto">
                <div class="card card-block card-3"></div>
                </div>
                <div class="col-auto">
                <div class="card card-block card-4"></div>
                </div>
                <div class="col-auto">
                <div class="card card-block card-5"></div>
                </div>
                <div class="col-auto">
                <div class="card card-block card-6"></div>
                </div>
                <div class="col-auto">
                <div class="card card-block card-7"></div>
                </div>
                <div class="col-auto">
                <div class="card card-block card-8"></div>
                </div>
                <div class="col-auto">
                <div class="card card-block card-9"></div>
                </div>
                <div class="col-auto">
                <div class="card card-block card-10"></div>
                </div>
            </div>
        </div>

    </>
  )
}

export default Recommendation