import React, { useState } from "react";
import ReviewItem from "../CourseDetailsComp/ReviewItem"

const ReviewsCourseView = (props) => {
  const [eneteredReview, setEnteredReview] = useState("");
  const reviewChangeHandler = (event) => {
    setEnteredReview(event.target.value);
  };
  const onClickHandller = () => {
    const reviewData = {};
    props.onSubmit(reviewData);
  };
  const reviews = props.reviews.map((review) => {
    return (
        <ReviewItem />
    );
  })
};

export default ReviewsCourseView;
