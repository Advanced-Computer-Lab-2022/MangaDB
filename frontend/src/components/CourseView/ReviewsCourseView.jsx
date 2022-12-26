import React, { useState } from "react";
import ReviewItem from "../CourseDetailsComp/ReviewItem";
import Rating from "@mui/material/Rating";
import SecondaryButton from "../UI/SecondaryButton";
import AverageSummary from "../Profile/Reviews/AverageSummary";

const ReviewsCourseView = (props) => {
  const [eneteredReview, setEnteredReview] = useState("");
  const [enteredRating, setEnteredRating] = useState("");

  const ratingChangeHandler = (event) => {
    setEnteredRating(event.target.value);
  };

  const reviewChangeHandler = (event) => {
    setEnteredReview(event.target.value);
  };

  const onClickHandler = () => {
    const reviewData = {
      userId: "63a37e9688311fa832f43336",
      rating: enteredRating,
      review: eneteredReview,
    };
    props.onSubmit(reviewData);
  };
  var reviews = "";
  if (props.reviews !== []) {
    reviews = props.reviews.map((review) => {
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
  } else {
    reviews = (
      <div className="mt-4 flex justify-center font-medium">
        No Reviews Found.
      </div>
    );
  }

  return (
    <div className="m-4">
      <div className="md:flex md:justify-between items-center mb-2">
        <div className="font-semibold text-xl">Leave a Review:</div>
        <div className="md:w-[18vw] flex md:justify-end mt-4 md:mt-0 space-x-2">
          <div>Rating</div>
          <Rating onChange={ratingChangeHandler} />
        </div>
      </div>
      <textarea
        onChange={reviewChangeHandler}
        className="w-full bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
      />
      <div className="flex justify-end mb-4">
        <SecondaryButton text="Submit" onClick={onClickHandler} />
      </div>
      <div>
        <div className=" font-semibold text-xl mb-4">Course Reviews:</div>
        <div className=" mb-6 mx-12">
          <AverageSummary />
        </div>
        <div className=" mx-8">{reviews}</div>
      </div>
    </div>
  );
};

export default ReviewsCourseView;
