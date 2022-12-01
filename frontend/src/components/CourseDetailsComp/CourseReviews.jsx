import React from "react";
import ReviewItem from "./ReviewItem";

const CourseReviews = (props) => {
  const reviews = props.reviews.map((review) => {
    return <ReviewItem 
        rating={review.rating}
        username={review.username}
        review={review.review}
        date={review.date}
    />;
  });
  return (
    <div>
      <div className="md:w-7/12 shadow-lg mx-10 mb-2">
        <div className="bg-gray-100 px-4 py-4 text-xl font-semibold rounded-t-md">
          <div>Course Reviews</div>
        </div>
        <div className="py-2 px-8">{reviews}</div>
      </div>
    </div>
  );
};

export default CourseReviews;