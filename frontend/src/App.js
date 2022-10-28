import "./App.css";
import CourseCard from "./components/Course/CourseCard";
import NavBar from "./components/NavBar";
import PrimaryButton from "./components/PrimaryButton";

import CountryManager from "./components/CountryManager";
import HomePage from "./containers/HomePage";
import AddUserForm from "./components/AddUserForm";
import Filters from "./components/Filters/Filters";
import SubjectFilter from "./components/Filters/SubjectFilter";
import Modal from "./components/UI/Modal";
import CourseDetailsPage from "./containers/CourseDetailsPage";
import CourseCardListView from "./components/Course/CourseCardListView";

function App() {
  const test = {
    image: `https://i0.wp.com/blog.frontiersin.org/wp-content/uploads/2018/06/frontiers-in-ecology-evolution-ape-human-bonobo-muscles.jpg?resize=940%2C529&ssl=1`,
    title: "React Full stack Course (MERN)",
    level: "Advanced",
    duration: "44 hrs",
    reviews: "5.0",
    subject: "Web Development",
    instructorName: "Omar Moataz",
    price: "599$",
    //text: "Home",
  };
  const options = [
    { id: 1, name: "Web Development" },
    { id: 2, name: "Machine Learning" },
    { id: 3, name: "Computer Science" },
    { id: 4, name: "Database Administration" },
    { id: 5, name: "Data Analytics" },
    { id: 6, name: "Business Adminstration" },
    { id: 7, name: "Artificial Intelligence" },
  ];
  return (
    // <CourseCard {...test}>

    // </CourseCard>
    <div>
      {/* <NavBar />
      <HomePage></HomePage> */}
      {/* <NavBar /> */}
      {/* <CourseCard {...test}/> */}
      {/* <CourseCardListView {...test}/> */}
      {/* <AddUserForm /> */}
      {/* <HomePage /> */}


      <CourseDetailsPage />
    </div>
  );
}
export default App;
