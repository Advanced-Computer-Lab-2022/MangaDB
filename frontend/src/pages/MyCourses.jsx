import { useState, useEffect , Fragment} from "react"
import axios from "axios";
import CourseCardListView from "../components/Course/CourseCardListView";
import CourseCard from "../components/Course/CourseCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Navbar from "../components/UI/NavBar/NavBar"

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
// stub for the courses 
const stub = [{
    _id: 1,
    totalMins: 400,
    courseTitle: "stub course ",
    instructorName : "Omar Moataz",
    subject : "Web Development",
    level: "Intermediate",
    courseDescription: "This is the stub description",
    coursePrice: 500,
    discountedPrice : 100,
    discount: 0.2,
    rating:5
},
{
    _id: 2,
    totalMins: 400,
    courseTitle: "stub course ",
    instructorName : "Omar Moataz",
    subject : "Web Development",
    level: "Intermediate",
    courseDescription: "This is the stub description",
    coursePrice: 500,
    discountedPrice : 100,
    discount: 0.2,
    rating:5
},
{
    _id: 3,
    totalMins: 400,
    courseTitle: "stub course ",
    instructorName : "Omar Moataz",
    subject : "Web Development",
    level: "Intermediate",
    courseDescription: "This is the stub description",
    coursePrice: 500,
    discountedPrice : 100,
    discount: 0.2,
    rating:5
},
{
    _id: 4,
    totalMins: 400,
    courseTitle: "stub course ",
    instructorName : "Omar Moataz",
    subject : "Web Development",
    level: "Intermediate",
    courseDescription: "This is the stub description",
    coursePrice: 500,
    discountedPrice : 100,
    discount: 0.2,
    rating:5
}
]

const MyCourses = () => {
    //replace the stub in the useState with an empty array 
const [myCourses,setMyCourses] = useState (stub)
const[page, setPage] = useState(1);

//funtion to handle the pagination
const onChangePageHandler = (event, value) => {
    setPage(value);
  };


//fetch the first 8? courses..
    useEffect(() => {
        //fetch the courses of the trainee
    },[])


    // handle the small screen and big screen..
    var coursesListView;
    var coursesCardsView;
    coursesListView = myCourses.map((course) => {
        return (
          <CourseCardListView
            id={course._id}
            duration={course.totalHours}
            title={course.courseTitle}
            instructorName={course.instructorName}
            subject={course.subject}
            level={course.level}
            description={course.courseDescription}
            coursePrice={course.coursePrice}
            discountedPrice={course.discountedPrice}
            discount={course.discount}
            rating={course.rating}
            // currencySymbol={currencySymbol}
          ></CourseCardListView>
        );
      });
      coursesCardsView = myCourses.map((course) => {
        return (
          <CourseCard
            id={course._id}
            duration={course.totalHours}
            title={course.courseTitle}
            instructorName={course.instructorName}
            subject={course.subject}
            level="Advanced"
            coursePrice={course.coursePrice}
            discountedPrice={course.discountedPrice}
            discount={course.discount}
            rating={course.rating}
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
   {myCourses.length !==0 && 
   <ThemeProvider theme={theme}>
          <Pagination
            className="ml-2 mr-2"
            count={myCourses.length} 
            color="primary"
            page={page}
            onChange={onChangePageHandler}
          />
    </ThemeProvider>} 
    </div>
</Fragment>)
  
}
export default MyCourses;