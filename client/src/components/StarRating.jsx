import React from "react";
import {FaStar} from 'react-icons/fa'

export default function StarRating ({rating}) {
    const ratingStarLong = [];
    for(let i = 0; i<rating;i++ ){
        ratingStarLong.push(rating)
    }
    return (
        <div style={{display:'flex'}}>
           {
            ratingStarLong.map(e => (
                <div >
                    <FaStar color="grey" size={22}
                    />
                </div>
            ))
           }
           
        </div>
    )
}