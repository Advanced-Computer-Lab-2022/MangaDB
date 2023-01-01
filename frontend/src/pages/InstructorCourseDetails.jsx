import React from "react";
import { Fragment, useState, useEffect } from "react";
import CourseDetailsCard from "../components/CourseDetailsComp/CourseDetailsCard";
import axios from "axios";
import CourseContent from "../components/CourseDetailsComp/CourseContent";
import InstructorCourseReviews from "../components/CourseDetailsComp/InstructorCourseReviews";
import { useLocation } from "react-router-dom";
import InstructorVideo from "../components/Video/InstructorVideo";
import NavBarSearch from "../components/UI/NavBar/NavBarSearch";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
const InstructorCourseDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [courseDetails, setCourseDetails] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const [courseReviews, setCourseReviews] = useState([]);
  const [reviewsCount, setReviewsCount] = useState([]);
  useEffect(() => {
    const role = localStorage.getItem("role");
    if(role !== "INSTRUCTOR"){
      navigate('/403')
    }
    window.scrollTo(0, 0, "smooth");
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

    axios
      .get("http://localhost:3000/course/rate/".concat(courseId), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourseReviews(res.data.review);
        setReviewsCount(res.data.count);
      });
  }, []);
  return (
    <Fragment>
      <NavBarSearch currentTab="My Courses" />
      {!loaded ? (
        <div className=" w-full h-full mt-12">
          <div className="flex w-full h-full  justify-center items-center ">
            <ReactLoading
              type={"bars"}
              color="#C6D8EC"
              height={667}
              width={375}
            />
          </div>
          <div className="flex items-center justify-center -mt-[275px]">
            <h1 className="text-center text-darkBlue font-bold text-3xl ">
              Loading...
            </h1>
          </div>
        </div>
      ) : (
        <Fragment>
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
            <InstructorVideo
              link={courseDetails.courseOverview}
            ></InstructorVideo>
          </div>
          <div className="text-xl font-semibold py-4 mx-10 md:w-7/12">
            <div className="mb-3">Course Summary</div>
            <section>
              <div
                className="ml-10 align-middle font-normal"
                dangerouslySetInnerHTML={{ __html: courseDetails.summary }}
              ></div>
            </section>
          </div>
          {loaded && (
            <CourseContent
              content={courseDetails.subtitles}
              courseDuration={courseDetails.totalMins}
            />
          )}
          <div className="text-xl font-semibold py-4 mx-10 md:w-7/12">
            <div className="mb-3">Course Requirements</div>
            <section>
              <div
                className="ml-10 font-normal"
                dangerouslySetInnerHTML={{ __html: courseDetails.requirements }}
              ></div>
            </section>
          </div>
          {loaded && (
            <InstructorCourseReviews
              reviews={courseReviews}
              reviewsCount={reviewsCount}
              userRegister={userRegistered}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default InstructorCourseDetailsPage;
