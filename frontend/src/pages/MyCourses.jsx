import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import CourseCardListView from "../components/Course/CourseCardListView";
import CourseCard from "../components/Course/CourseCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Navbar from "../components/UI/NavBar/NavBar";

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

  //funtion to handle the pagination
  const onChangePageHandler = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    //fetch the courses of the trainee
    axios
      .get(
        `http://localhost:3000/user/mycourses/63a37e9688311fa832f43336/?page=${page}`
      )
      .then((res) => {
        setNoOfPages(res.data.count);
        setMyCourses(res.data.courses);
      });
  }, [page]);
  console.log(myCourses);
  // handle the small screen and big screen..
  var coursesListView;
  var coursesCardsView;
  coursesListView = myCourses.map((course) => {
    return (
      <CourseCardListView
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
        // currencySymbol={currencySymbol}
      ></CourseCardListView>
    );
  });
  coursesCardsView = myCourses.map((course) => {
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
  });

  return (
    <Fragment>
      <Navbar></Navbar>
      <div className="flex flex-col gap-y-4 mb-4">
        <div className="font-bold text-2xl ml-24">Results:</div>
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
  );
};
export default MyCourses;
