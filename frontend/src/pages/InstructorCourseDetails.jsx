import React from "react";
import { Fragment, useState, useEffect } from "react";
import NavBar from "../components/UI/NavBar/NavBar";
import CourseDetailsCard from "../components/CourseDetailsComp/CourseDetailsCard";
import axios from "axios";
import CourseContent from "../components/CourseDetailsComp/CourseContent";
import InstructorCourseReviews from "../components/CourseDetailsComp/InstructorCourseReviews";
import { useLocation } from "react-router-dom";
import InstructorVideo from "../components/Video/InstructorVideo";
import NavBarSearch from "../components/UI/NavBar/NavBarSearch";
const InstructorCourseDetailsPage = () => {
  const location = useLocation();
  const [courseDetails, setCourseDetails] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const [courseReviews, setCourseReviews] = useState([]);
  const [reviewsCount, setReviewsCount] = useState([]);
  useEffect(() => {
    const courseId = location.state.courseId;
    axios
      .get("http://localhost:3000/course/".concat(courseId), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourseDetails(res.data.course);
        console.log(res.data.course);
        setLoaded(true);
        if (res.data.userData !== null) {
          setUserRegistered(true);
        } else {
          setUserRegistered(false);
        }
      });

    // axios
    //   .post(`http://localhost:3000/invoice/${location.state.courseId}`, {
    //     userId: userId,
    //   })
    //   .then((res) => {})
    //   .catch((error) => {
    //     if (
    //       +error.message.split(" ")[error.message.split(" ").length - 1] === 400
    //     ) {
    //       setUserRegistered(true);
    //     } else {
    //       setUserRegistered(false);
    //     }
    //   });

    axios
      .get("http://localhost:3000/course/rate/".concat(courseId), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // setCourseDetails(res.data.course);
        // console.log(res.data.course);
        // setLoaded(true);
        setCourseReviews(res.data.review);
        setReviewsCount(res.data.count);
      });

    // axios
    //   .get("http://localhost:3000/course/rate/".concat(courseId).concat("/"))
    //   .then((res) => {
    //     console.log(res);
    //   });
  }, []);
  return (
    <Fragment>
      <NavBarSearch currentTab="My Courses" />
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
      <div className="mx-8 mt-4 h-[600px] w-3/4">
        <InstructorVideo link={courseDetails.courseOverview}></InstructorVideo>
      </div>
      <div className="text-xl font-semibold py-4 mx-10 md:w-7/12">
        <div className="mb-3">Course Summary</div>
        <div
          className="ml-10 align-middle font-normal"
          dangerouslySetInnerHTML={{ __html: courseDetails.summary }}
        ></div>
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
      {loaded && (
        <InstructorCourseReviews
          reviews={courseReviews}
          reviewsCount={reviewsCount}
          userRegister={userRegistered}
        />
      )}
    </Fragment>
  );
};

export default InstructorCourseDetailsPage;
