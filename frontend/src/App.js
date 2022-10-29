import "./App.css";
import CourseCard from "./components/Course/CourseCard";
import NavBar from "./components/NavBar";
import PrimaryButton from "./components/PrimaryButton";
import Subtitle from "./components/CourseSubtitles/Subtitle";
import CountryManager from "./components/CountryManager";
import HomePage from "./containers/HomePage";
import AddUserForm from "./components/AddUserForm";
import Filters from "./components/Filters/Filters";
import SubjectFilter from "./components/Filters/SubjectFilter";
import Modal from "./components/UI/Modal";
import CourseDetailsPage from "./containers/CourseDetailsPage";
import CourseCardListView from "./components/Course/CourseCardListView";

import Filter from "./components/Filters/Filters";
import Table from "./components/Table/Table";
import Search from "./components/Search";
import SecondaryButton from "./components/SecondaryButton";
import TertiaryButton from "./components/TertiaryButton";
import InstructorControls from "./components/Table/InstructorControls";
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
    description: "This course is fully up-to-date with React 18 (the latest version of React)! It was completely updated and re-recorded from the ground up - it teaches the very latest version of React with all the core, modern features you need to know!",
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
      {/* <AddNewCourse></AddNewCourse> */}
      <AddSubtitles></AddSubtitles>
      
      {/* <Subtitle subtitleHeader={subtitleHeader} sources={sources}></Subtitle>
      <Subtitle subtitleHeader={subtitleHeader2} sources={sources}></Subtitle>
      <Subtitle subtitleHeader={subtitleHeader3} sources={sources}></Subtitle>
      <Subtitle subtitleHeader={subtitleHeader4} sources={sources}></Subtitle> */}
      {/* <Modal>
        <Filter options={options} exchange={1}></Filter>
        </Modal> */}
      {/* <NavBar />
      <InstructorControls />
      <Table rows={courses}></Table> */}
      <CourseDetailsPage {...test}/>
      {/* <CourseCardListView {...test}/> */}
    </div>
  );
}

export default App;
