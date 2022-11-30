import React, { Fragment } from "react";
import Stars from "../UI/Stars";

const size = 3;

const ReviewItem = (props) => {
    return (
        <Fragment>
            <div className="text-lg font-medium">
                {props.username}
            </div>
            <Stars rating={props.rating} size={size}/>
            <div className="text-gray-500 text-sm font-light mb-6">
                {props.review}
            </div>
        </Fragment>
    );
};

export default ReviewItem;