import React from "react";
import { useState } from "react";
import './style_review_banner.css'
import './style_popup.css'
import PopUp from './PopUp'
import Rating from '@mui/material/Rating';

const ReviewBaner = ({data, onButtonClick}) => {
  const { starAvg, reviewCount, star5Count, star4Count, star3Count, star2Count, star1Count } = data;

  // const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    onButtonClick()
  };
  return (
    <div className="review_banner-ecommerce-product-summary">
      <div className="review_banner-stack">
        <div className="review_banner-average-rating publicsans-semi-bold-pale-sky-16px">
          <span className="publicsans-semi-bold-pale-sky-16px">生徒からの評価</span>
        </div>
        <h1 className="review_banner-text-1 publicsans-extra-bold-charade-48px">
          <span className="publicsans-extra-bold-charade-48px">{starAvg}</span>
        </h1>
        <Rating name="read-only" value={starAvg} readOnly />
        <div className="review_banner-x824kreviews publicsans-normal-pale-sky-12px">
          <span className="publicsans-normal-pale-sky-12px">{reviewCount}</span>
        </div>
      </div>
      <img className="review_banner-divider" src="https://www.seekpng.com/png/detail/330-3307905_thin-vertical-line-straight-vertical-line-png.png" alt="Divider" />
      <div className="review_banner-stack-1">
        <Row spanText1="5 つ星" spanText2={star5Count} />
        <Row
          spanText1="4 つ星"
          spanText2={star4Count}
        />
        <Row
          spanText1="3 つ星"
          spanText2={star3Count}
        />
        <Row
          spanText1="2 つ星"
          spanText2={star2Count}
        />
        <Row
          spanText1="1 つ星"
          spanText2={star1Count}
        />
      </div>
      <img className="review_banner-divider" src="https://www.seekpng.com/png/detail/330-3307905_thin-vertical-line-straight-vertical-line-png.png" alt="Divider" />
      <div className="review_banner-stack-2">
        <div className="review_banner-stack-2-content">
        <img className="review_banner-shape" src="https://simpleicon.com/wp-content/uploads/pencil.png" alt="shape" />
        <div className="review_banner-label publicsans-bold-charade-15px"  onClick={handleClick}>
          <span className="publicsans-bold-charade-15px">レビューする</span>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewBaner;

function Row(props) {
  const { spanText1, spanText2 } = props;

  return (
    <div className="review_banner-stack-1-item-1 review_banner-stack-1-item">
      <div className="review_banner-x-star publicsans-semi-bold-charade-14px">
        <span className="review_banner-span-1 publicsans-semi-bold-charade-14px">"{spanText1}"</span>
      </div>
      <div className="review_banner-container">
        <div className="review_banner-progress"></div>
      </div>
      <div className="review_banner-number-shortrand publicsans-normal-pale-sky-14px">
        <span className="review_banner-span-1 publicsans-normal-pale-sky-14px">{spanText2}</span>
      </div>
    </div>
  );
}