import React, { useState } from "react";
import ReviewItem from "./ReviewItem";
import Rating from "@mui/material/Rating";
import SecondaryButton from "../UI/SecondaryButton";
import AverageSummary from "../Profile/Reviews/AverageSummary";

const CourseReviews = (props) => {
  const reviews = props.reviews.map((review) => {
    const formattedDate = review.date.substring(0, 10).split("-");
    const year = formattedDate[0];
    const month =
      formattedDate[1] === "1"
        ? "January"
        : formattedDate[1] === "2"
        ? "February"
        : formattedDate[1] === "3"
        ? "March"
        : formattedDate[1] === "4"
        ? "April"
        : formattedDate[1] === "5"
        ? "May"
        : formattedDate[1] === "6"
        ? "June"
        : formattedDate[1] === "7"
        ? "July"
        : formattedDate[1] === "8"
        ? "August"
        : formattedDate[1] === "9"
        ? "September"
        : formattedDate[1] === "10"
        ? "October"
        : formattedDate[1] === "11"
        ? "November"
        : "December";
    const day = formattedDate[2];
    const fullDate = month + " " + day + ", " + year;
    return (
      <ReviewItem
        rating={review.rating}
        username={review.userName}
        review={review.review}
        date={fullDate}
      />
    );
  });

  const [enteredRating, setEnteredRating] = useState("");
  const [enteredReview, setEnteredReview] = useState("");

  const ratingChangeHandler = (event) => {
    setEnteredRating(event.target.value);
  };

  const reviewChangeHandler = (event) => {
    setEnteredReview(event.target.value);
  };

  const onClickHandler = () => {
    const data = {
      userId: "638a07cdbc3508481a2d7da9",
      rating: enteredRating,
      review: enteredReview,
    };
    props.onSubmit(data);
  };

  return (
    <div>
      <div className="md:w-7/12 shadow-lg mx-10 mb-2">
        <div className="bg-gray-100 px-4 py-4 text-xl font-semibold rounded-t-md">
          <div>Course Reviews</div>
        </div>
        {props.userRegister && (
          <div className="mt-4">
            <div className="px-8 font-medium text-lg flex justify-between">
              <div>Write Your Review</div>
              <div className=" font-normal text-base flex space-x-4">
                <div>Rating</div>
                <div>
                  <Rating onChange={ratingChangeHandler} />
                </div>
              </div>
            </div>
            <div className="px-8">
              <textarea
                onChange={reviewChangeHandler}
                className="w-full bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
              />
            </div>
            <div className="flex justify-end px-8">
              <SecondaryButton className="mb-4" onClick={onClickHandler}>
                Submit
              </SecondaryButton>
            </div>
          </div>
        )}
        <div className="px-8 mb-4">
          <AverageSummary count={props.reviewsCount} />
        </div>
        <div className="py-2 px-8">{reviews}</div>
      </div>
    </div>
  );
};

export default CourseReviews;
