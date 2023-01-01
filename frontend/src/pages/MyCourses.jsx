import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import CourseCardListView from "../components/Course/CourseCardListView";
import CourseCard from "../components/Course/CourseCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Navbar from "../components/UI/NavBar/NavBar";
import ReactLoading from "react-loading";

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

const MyCourses = () => {
  //replace the stub in the useState with an empty array
  const [myCourses, setMyCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(0);

  const [myRequests, setMyRequests] = useState([]);
  const [render, setRender] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));
  const [countryCode, setCountryCode] = useState(
    localStorage.getItem("countryCode") === null
      ? "US"
      : localStorage.getItem("countryCode")
  );

  //funtion to handle the pagination

  const renderHandler = () => {
    setRender(!render);
  };

  const onChangePageHandler = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0, "smooth");
    //fetch the courses of the trainee
    axios
      .get(`http://localhost:3000/user/mycourses/?page=${page}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setNoOfPages(res.data.count);
        setMyCourses(res.data.courses);
        setLoaded(true);
      });

    axios
      .get(`http://localhost:3000/request/user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        for (let i = 0; i < res.data.requests.length; i++) {
          if (res.data.requests[i].type === "refund") {
            setMyRequests([...myRequests, res.data.requests[i].course]);
          }
        }
      });
  }, [page, render]);

  // handle the small screen and big screen..
  var coursesListView;
  var coursesCardsView;
  coursesListView = myCourses.map((course) => {
    return (
      <CourseCardListView
        id={course.course._id}
        duration={course.course.totalMins}
        title={course.course.courseTitle}
        instructorName={course.course.instructorName}
        subject={course.course.subject}
        level={course.courselevel}
        description={course.course.courseDescription}
        coursePrice={course.course.coursePrice}
        discountedPrice={course.course.discountedPrice}
        discount={course.course.discount}
        rating={course.course.rating}
        percentageCompleted= {course.percentageCompleted}
        totalSources = {course.totalSources}
        refundable={
          course.totalSources / 2 >= course.percentageCompleted &&
          userRole == "TRAINEE"
        }
        myCourses={true}
        requested={myRequests.includes(course.course._id)}
        renderHandler={renderHandler}
        // currencySymbol={currencySymbol}
      ></CourseCardListView>
    );
  });
  coursesCardsView = myCourses.map((course) => {
    return (
      <CourseCard
        id={course.course._id}
        duration={course.course.totalMins}
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
  });

  const onChangeHandler = (e) => {
    setCountryCode(e);
    localStorage.setItem("countryCode", e);
  };

  return (
    <Fragment>
      <Navbar onChange={onChangeHandler} currentTab="My Courses" />
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
          <div className="flex flex-col gap-y-4 mb-4">
            <div className="font-bold text-2xl ml-24 mt-4">Results:</div>
            <div className="flex-col items-center gap-y-4 hidden lg:flex">
              {coursesListView}
            </div>
            <div className="flex justify-around flex-wrap lg:hidden">
              {coursesCardsView}
            </div>
          </div>
          <div className="flex justify-center items-center mt-4">
            {myCourses.length !== 0 && (
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
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyCourses;
