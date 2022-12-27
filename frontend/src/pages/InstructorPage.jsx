import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import NavBar from "../components/UI/NavBar/NavBar";
import SecondaryButton from "../components/UI/SecondaryButton";
import AverageSummary from "../components/Profile/Reviews/AverageSummary";
import ReviewItem from "../components/CourseDetailsComp/ReviewItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import CourseCard from "../components/Course/CourseCard";

import {
  BookOpenIcon,
  CalendarIcon,
  UsersIcon,
} from "@heroicons/react/outline";

import Rating from "@mui/material/Rating";
const stats = [
  {
    id: 1,
    name: " Number Of Students",
    stat: "71,897",
    icon: UsersIcon,
  },
  {
    id: 2,
    name: `Number Of Reviews `,
    stat: `2000`,
    icon: CalendarIcon,
  },
  {
    id: 3,
    name: `Number Of Courses`,
    stat: "30",
    icon: BookOpenIcon,
  },
];

// pagination blue theme
const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#3970AC",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});
const reviews = [
  {
    date: "2022-12-27T10:15:58.506+00:00",
    userName: "Omar Moataz",
    rating: 1,
    review: "this is so shit ",
  },
  {
    date: "2022-12-27T10:15:58.506+00:00",
    userName: "Omar Moataz",
    rating: 4,
    review: "this is so shit ",
  },
  {
    date: "2022-12-27T10:15:58.506+00:00",
    userName: "Omar Moataz",
    rating: 2,
    review: "this is so shit ",
  },
];
const InstructorPage = () => {
  const [receivedData, setReceivedData] = useState({});
  const [enteredReview, setEnteredReview] = useState("");
  const [enteredRating, setEnteredRating] = useState("");
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(0);

  //funtion to handle the pagination
  const onChangePageHandler = (event, value) => {
    setPage(value);
  };

  //submit the instructor review
  const onClickHandler = () => {
    const reviewData = {
      userId: "63a37e9688311fa832f43336",
      rating: enteredRating,
      review: enteredReview,
    };
    //axios submit review instructor review here
  };

  //listen on the rating change
  const ratingChangeHandler = (event) => {
    setEnteredRating(event.target.value);
  };
  //listen on the review change
  const reviewChangeHandler = (event) => {
    setEnteredReview(event.target.value);
  };

  var displayedReviews = [];
  if (reviews !== []) {
    displayedReviews = reviews.map((review) => {
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
    displayedReviews = (
      <div className="mt-4 flex justify-center font-medium">
        No Reviews Found.
      </div>
    );
  }

  return (
    <Fragment>
      <NavBar></NavBar>
      <div className="flex-col items-center justify-center">
        <p className=" flex items-center justify-center  font-semibold text-gray-500">
          INSTRUCTOR
        </p>
        <p className=" flex items-center justify-center font-bold text-4xl">
          Omar Moataz
        </p>
        <p className="flex items-center justify-center text-gray-500">
          About Me
        </p>
        <p className="flex items-center justify-center text-center">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          consequuntur voluptates itaque, perspiciatis pariatur unde veniam
          culpa obcaecati soluta nesciunt autem, incidunt quia rem labore cum
          magni eaque. Cupiditate, blanditiis.
        </p>
        <div className="ml-2">
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.id}
                className="relative bg-white pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
              >
                <dt>
                  <div className="absolute bg-primaryBlue rounded-md p-3">
                    <item.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </p>
                </dt>
                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {item.stat}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="m-4 mt-6">
          <div className="md:flex md:justify-between items-center mb-2">
            <div className="font-semibold text-xl">Leave a Review:</div>
            <div className="md:w-[18vw] flex md:justify-end mt-4 md:mt-0 space-x-2">
              <div>Rating</div>
              <Rating onChange={ratingChangeHandler} />
            </div>
          </div>
          <textarea
            reviewState={enteredReview}
            onChange={reviewChangeHandler}
            className="w-full bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
          />
          <div className="flex justify-end mb-4">
            <SecondaryButton text="Submit" onClick={onClickHandler} />
          </div>
          <div>
            <div className=" font-semibold text-xl mb-4">
              Instructor Reviews:
            </div>
            <div className=" mb-6 mx-12">
              <AverageSummary
                count={[
                  { rating: 1, count: 12 },
                  { rating: 2, count: 1 },
                  { rating: 3, count: 22 },
                  { rating: 4, count: 25 },
                  { rating: 5, count: 7 },
                ]}
              />
            </div>
            <div className=" mx-8">{displayedReviews}</div>
          </div>
        </div>
        {/* <div className="flex justify-center items-center mt-4">
          {receivedData.myCourses.length !== 0 && (
            <ThemeProvider theme={theme}>
              <Pagination
                className="ml-2 mr-2"
                count={Math.ceil(noOfPages / 10)}
                color="primary"
                page={page}
                onChange={onChangePageHandler}
              />
            </ThemeProvider>
          )}
        </div> */}
      </div>
    </Fragment>
  );
};
export default InstructorPage;
