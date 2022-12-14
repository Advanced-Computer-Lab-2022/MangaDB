import React from "react";
import { Fragment, useState, useEffect } from "react";
import NavBar from "../components/UI/NavBar/NavBar";
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
    date: "July 23, 2021",
  },
  {
    rating: 2,
    username: "Misho",
    review: "This is review 2",
    date: "July 23, 2021",
  },
  {
    rating: 4.5,
    username: "Misho",
    review: "This is review 3",
    date: "July 23, 2021",
  },
];

const CourseDetailsPage = () => {
  const location = useLocation();
  const [courseDetails, setCourseDetails] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  useEffect(() => {
    const courseId = location.state.courseId;

    axios.get("http://localhost:3000/course/".concat(courseId).concat("/638a07cdbc3508481a2d7da9")).then((res) => {
      setCourseDetails(res.data.course);
      console.log(res.data.course);
      setLoaded(true);
    });
    const userId = "638a07cdbc3508481a2d7da9";
    axios
      .post(`http://localhost:3000/invoice/${location.state.courseId}`, {
        userId:userId,
      })
      .then((res) => {})
      .catch((error) => {
        if (
          +error.message.split(" ")[error.message.split(" ").length - 1] === 400
        ) {
          setUserRegistered(true);
        } else {
          setUserRegistered(false);
        }
      });
  }, [location.state]);

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
      <AddToCartCard
        courseOverview={courseDetails.courseOverview}
        id={courseDetails._id}
        userRegister={userRegistered}
        courseImage={courseDetails.courseImage}
      />
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
          courseDuration={courseDetails.totalMins}
        />
      )}
      <div className="text-xl font-semibold py-4 mx-10 md:w-7/12">
        <div className="mb-3">Course Requirements</div>
        <div
          className="ml-10 font-normal"
          dangerouslySetInnerHTML={{ __html: courseDetails.requirements }}
        ></div>
      </div>
      {!loaded && (
        <CourseReviews
          //reviews={courseDetails.reviews}
          reviews={rev}
        />
      )}
    </Fragment>
  );
};

export default CourseDetailsPage;
