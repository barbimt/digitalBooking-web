import React, { useEffect } from "react";
import Rate from "rc-rate";
import "./../RatingStars/ratingStars.css";
import "rc-rate/assets/index.css";
import {useState} from "react";

function RatingScore({ puntaje }) {
const [starsAmount, setStarsAmount] = useState(0);
useEffect(() => {
  setStarsAmount(puntaje/2);
})



  return (
   <>
<div className="rate-container--form-user">
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
