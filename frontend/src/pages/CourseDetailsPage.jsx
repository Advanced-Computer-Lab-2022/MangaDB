import React from "react";
import { Fragment, useState, useEffect } from "react";
import NavBarSearch from "../components/UI/NavBar/NavBarSearch";
import CourseDetailsCard from "../components/CourseDetailsComp/CourseDetailsCard";
import axios from "axios";
import AddToCartCard from "../components/CourseDetailsComp/AddToCartCard";
import CourseContent from "../components/CourseDetailsComp/CourseContent";
import CourseReviews from "../components/CourseDetailsComp/CourseReviews";
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";
const CourseDetailsPage = () => {
  const location = useLocation();
  const [courseDetails, setCourseDetails] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const [courseReviews, setCourseReviews] = useState([]);
  const [reviewsCount, setReviewsCount] = useState([]);
  const [requested, setRequested] = useState(false);
  const [render, setRender] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
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
        setLoaded(true);
        if (res.data.userData !== null) {
          setUserRegistered(true);
        } else {
          setUserRegistered(false);
        }
      });

    getReviewsAndRatings();

    //get the requests of the user and check if the course is requested before
    axios
      .get(`http://localhost:3000/request/user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        for (let i = 0; i < res.data.requests.length; i++) {
          if (
            res.data.requests[i].type === "access" &&
            res.data.requests[i].course === courseId
          ) {
            setRequested(true);
          }
        }
      });
  }, [render]);

  const setRenderHandler = (prevRender) => {
    setRender(!prevRender);
  };

  const getReviewsAndRatings = () => {
    const courseId = location.state.courseId;
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
  };

  const submitReviewHandler = (data) => {
    const courseId = location.state.courseId;
    axios
      .post(
        "http://localhost:3000/course/rate/".concat(courseId).concat("/"),
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        getReviewsAndRatings();
        setRenderHandler(render);
        setDisableButton(true);
      });
  };
  return (
    <Fragment>
      <NavBarSearch currentTab="" />
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
              id={courseDetails.instructor}
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
            id={location.state.courseId}
            userRegister={userRegistered}
            courseImage={courseDetails.courseImage}
            requested={requested}
          />
          <div className="text-xl font-semibold py-4 mx-10 md:w-7/12">
            <div className="mb-3">Course Summary</div>
            <section>
              <div
                className="ml-10 align-middle font-normal"
                dangerouslySetInnerHTML={{ __html: courseDetails.summary }}
              ></div>
            </section>
          </div>
          <CourseContent
            content={courseDetails.subtitles}
            courseDuration={courseDetails.totalMins}
          />

          <div className="text-xl font-semibold py-4 mx-10 md:w-7/12">
            <div className="mb-3">Course Requirements</div>
            <section>
              <div
                className="ml-10 font-normal"
                dangerouslySetInnerHTML={{ __html: courseDetails.requirements }}
              ></div>
            </section>
          </div>
          <CourseReviews
            reviews={courseReviews}
            reviewsCount={reviewsCount}
            onSubmit={submitReviewHandler}
            userRegister={userRegistered}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default CourseDetailsPage;
