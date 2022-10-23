import "./App.css";
import CourseCard from "./components/Course/CourseCard";
import NavBar from "./components/NavBar";
import SearchFilter from "./components/SearchFilter";
import CountryManager from "./components/CountryManager";



function App() {
  const test = {
    image: `https://i0.wp.com/blog.frontiersin.org/wp-content/uploads/2018/06/frontiers-in-ecology-evolution-ape-human-bonobo-muscles.jpg?resize=940%2C529&ssl=1`,
    title: "React Full stack Course (MERN)",
    level: "Advanced",
    duration: "44 hrs",
    reviews: "  1195",
    subject: "web development",
    instructorName: "Omar Moataz",
    price: "200$",
  };
  return(
    <div>
    <NavBar/>
    <SearchFilter/>
    </div>
  )
  ;
}
export default App;
