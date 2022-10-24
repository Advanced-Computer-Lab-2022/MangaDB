import "./App.css";
import CourseCard from "./components/Course/CourseCard";
import NavBar from "./components/NavBar";
import PrimaryButton from "./components/PrimaryButton";

import CountryManager from "./components/CountryManager";
import HomePage from "./containers/HomePage";
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
  return (
    // <CourseCard {...test}>

    // </CourseCard>
    <div>
      {/* <NavBar />
      <HomePage /> */}
      {/* <NavBar /> */}
      <CourseCard {...test}/>
    </div>
  );
}
export default App;
