import ReviewItem from "./ReviewItem";
import AverageSummary from "../Profile/Reviews/AverageSummary";

const InstructorCourseReviews = (props) => {
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
  return (
    <div>
      <div className="md:w-7/12 shadow-lg mx-10 mb-2">
        <div className="bg-gray-100 px-4 py-4 text-xl font-semibold rounded-t-md">
          <div>Course Reviews</div>
        </div>
        <div className="px-8 mb-4 mt-3">
          <AverageSummary count={props.reviewsCount} />
        </div>
        <div className="py-2 px-8">{reviews}</div>
      </div>
    </div>
  );
};

export default InstructorCourseReviews;
