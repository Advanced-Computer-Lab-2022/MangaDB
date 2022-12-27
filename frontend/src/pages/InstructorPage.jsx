import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import NavBar from "../components/UI/NavBar/NavBar";
import SecondaryButton from "../components/UI/SecondaryButton";
import AverageSummary from "../components/Profile/Reviews/AverageSummary";
import ReviewItem from "../components/CourseDetailsComp/ReviewItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CourseCard from "../components/Course/CourseCard";

import {
  BookOpenIcon,
  CalendarIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import Rating from "@mui/material/Rating";
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

const InstructorPage = () => {
  const [receivedData, setReceivedData] = useState({});
  const [enteredReview, setEnteredReview] = useState("");
  const [enteredRating, setEnteredRating] = useState("");
  const [summary, setSummary] = useState([]);
  const [statsConf, setStatsConf] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [reviewedBefore,setReviewedBefore] =useState(false)
  //fetch the data at the start of the code ..
  useEffect(() => {
    axios
      .get("http://localhost:3000/instructor/63a36fd41bd9f2e6163b0481")
      .then((res) => {
        setReceivedData(res.data);
        setReviews(res.data.instructor.reviews);
        setStatsConf([
          res.data.students,
          res.data.instructor.reviews.length,
          res.data.instructor.courseDetails.length,
        ]);
        setSummary(res.data.count);
        setLoading(false);
      });
  }, []);

  //stats for the performance thinggy
  var stats;
  if (statsConf.length !== 0) {
    stats = [
      {
        id: 1,
        name: " Number Of Students",
        stat: receivedData.students,
        icon: UsersIcon,
      },
      {
        id: 2,
        name: `Number Of Reviews `,
        stat: receivedData.instructor.reviews.length,
        icon: CalendarIcon,
      },
      {
        id: 3,
        name: `Number Of Courses`,
        stat: receivedData.instructor.courseDetails.length,
        icon: BookOpenIcon,
      },
    ];
  }

  //submit the instructor review
  const onClickHandler = () => {
    const reviewData = {
      userId: "63a37e9688311fa832f43336",
      rating: enteredRating,
      review: enteredReview,
    };
    axios
      .post(
        "http://localhost:3000/instructor/rate/63a36fd41bd9f2e6163b0481",
        reviewData
      )
      .then((res) => {
        console.log(res.data.review);
        setReviews([...reviews, res.data.review]);
        
      });
  };

  console.log(receivedData);
  //listen on the rating change
  const ratingChangeHandler = (event) => {
    setEnteredRating(event.target.value);
  };
  //listen on the review change
  const reviewChangeHandler = (event) => {
    setEnteredReview(event.target.value);
  };

  //handle the displayed Reviews
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
        No Reviews Found For This Instructor.
      </div>
    );
  }
  //handle the displayed instructor courses
  if (!loading) {
    var displayedCourses = receivedData.instructor.courseDetails.map(
      (course) => {
        return (
          <CourseCard
            id={course.course._id}
            duration={course.course.totalHours}
            title={course.course.courseTitle}
            instructorName={course.course.instructorName}
            subject={course.course.subject}
            level={course.courselevel}
            description={course.course.courseDescription}
            coursePrice={course.course.coursePrice}
            discountedPrice={course.course.discountedPrice}
            discount={course.course.discount}
            rating={course.course.rating}
            currencySymbol="$"
          ></CourseCard>
        );
      }
    );
  }

  return (
    <Fragment>
      <NavBar></NavBar>
      {!loading && (
        <div className="flex-col items-center justify-center">
          <p className=" flex items-center justify-center  font-semibold text-gray-500">
            INSTRUCTOR
          </p>
          <p className=" flex items-center justify-center font-bold text-4xl">
            {receivedData.instructor.firstName}{" "}
            {receivedData.instructor.lastName}
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
                <AverageSummary count={summary} />
              </div>
              <div className=" mx-8">{displayedReviews}</div>
            </div>
          </div>
          <div>
            <div className=" font-semibold text-xl mb-4">
              Instructor Courses:
            </div>
            <div>{displayedCourses}</div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default InstructorPage;
