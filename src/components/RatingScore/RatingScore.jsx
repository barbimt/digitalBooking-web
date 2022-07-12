import React, { useEffect } from "react";
import Rate from "rc-rate";
import "./../RatingStars/ratingStars.css";
import "rc-rate/assets/index.css";
import {useState} from "react";

function RatingScore({ score }) {
const [starsAmount, setStarsAmount] = useState(0);
useEffect(() => {
  setStarsAmount(score/2);
})

const getDescriptionScore = () => {
  if (score <= 2) {
    return "Malo";
  } else if (score <= 4) {
    return "Regular";
  } else if (score <= 6) {
    return "Bueno";
  } else if (score <= 8) {
    return "Muy bueno";
  } else {
    return "Excelente";
  }
}

  return (
   <>
      <div className="pd-product-rating-container">
        <div className="pd-rating-nro">
          <p>{score}</p>
        </div>
        <p className="pd-rating-description">{getDescriptionScore()}</p>
      </div>
<div className="rate-container">
   <Rate
        allowHalf
        //  defaultValue={starsAmount}
        disabled={true}
        allowClear={false}
        value={starsAmount}
      />
</div>
     
 </>
  );
}

export default RatingScore;
