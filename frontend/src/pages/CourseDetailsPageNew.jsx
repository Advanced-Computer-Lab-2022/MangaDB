import React from "react";
import { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import CourseDetailsCard from "../components/CourseDetailsComp/CourseDetailsCard";
import axios from "axios";
import AddToCartCard from "../components/CourseDetailsComp/AddToCartCard";
import CourseContent from "../components/CourseDetailsComp/CourseContent";
import CourseReviews from "../components/CourseDetailsComp/CourseReviews";
import { useLocation } from "react-router-dom";


const rev = [
  {
    rating: 1,
    username: "Misho",
    review:
      "lorem Ipsum is simply  dummy. Lorem Ipsum is simply Lorem Ipsum. Lorem Ips    incorrectly reports that Lorem Ips is simply Lorem Ipsum. Lorem Ips incorrectly reports that Lorem Ips incorrectly reports that Lore      mips Lorem Ips incorrectly reports that Lore ",
  },
  { rating: 2, username: "Misho", review: "This is review 2" },
  { rating: 4.5, username: "Misho", review: "This is review 3" },
];

const CourseDetailsPageNew = (props) => {
  const location = useLocation();
  const [courseDetails, setCourseDetails] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const courseId = location.state

    axios.get("http://localhost:3000/course/".concat(courseId)).then((res) => {
      setCourseDetails(res.data.course);
      setLoaded(true);
      console.log(res.data.course);
    });
  }, [location.state]);

  var requirements = [];

  if (loaded) {
    requirements = courseDetails.requirements.map((requirement) => {
      return <li>{requirement}</li>;
    });
  }
  return (
    <Fragment>
      <NavBar />
      <div className="bg-veryLightBlue py-4 px-6 flex justify-between">
        <CourseDetailsCard
          courseTitle={courseDetails.courseTitle}
          level={courseDetails.level}
          instructorName={courseDetails.instructorName}
          subject={courseDetails.subject}
          courseDescription={courseDetails.courseDescription}
          rating={courseDetails.rating}
          discount={courseDetails.discount}
          coursePrice={courseDetails.coursePrice}
          discountedPrice={courseDetails.discountedPrice}
          currencySymbol="$"
        />
      </div>
      <AddToCartCard courseImage={courseDetails.courseImage} />
      <div className="text-xl font-semibold py-4 mx-10 md:w-7/12">
        <div className="mb-3">Course Summary</div>
        {/* <div className="ml-10 align-middle">{props.courseSummary}</div> */}
        <div className="ml-10 align-middle font-normal">
          {courseDetails.summary}
        </div>
      </div>
      {loaded && (
        <CourseContent
          content={courseDetails.subtitles}
          courseDuration={courseDetails.totalHours}
        />
      )}
      <div className="text-xl font-semibold py-4 mx-10 md:w-7/12">
        <div className="mb-3">Course Requirements</div>
        <ul className="list-disc font-normal sm:grid sm:grid-cols-2 ml-10 align-middle">
          {requirements.length !== 0 && requirements}
        </ul>
      </div>
      {loaded && (
        <CourseReviews
          //reviews={courseDetails.reviews}
          reviews={rev}
        />
      )}
    </Fragment>
  );
};

export default CourseDetailsPageNew;
