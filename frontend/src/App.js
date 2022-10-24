import "./App.css";
// import CourseCard from "./components/Course/CourseCard";
// import NavBar from "./components/NavBar";
// import CountryManager from "./components/CountryManager";
// import Subtitle from "./components/CourseSubtitles/Subtitle";
// import Card from "./components/UI/Card";
import Modal from "./components/UI/Modal";
import Filters from "./components/Filters/Filters";
// import SubjectFilter from "./components/Filters/SubjectFilter";
// import RatingFilter from "./components/Filters/RatingFilter";
// import PriceFilter from "./components/Filters/PriceFilter";
// import { useState } from "react";
function App() {
  // const test = {
  //   image: `https://i0.wp.com/blog.frontiersin.org/wp-content/uploads/2018/06/frontiers-in-ecology-evolution-ape-human-bonobo-muscles.jpg?resize=940%2C529&ssl=1`,
  //   title: "React Full stack Course (MERN)",
  //   level: "Advanced",
  //   duration: "44 hrs",
  //   reviews: "  1195",
  //   subject: "web development",
  //   instructorName: "Omar Moataz",
  //   price: "200$",
  // };
  // const [shown,setShown] = useState(true)
  // const subtitleHeader = "introduction to web development";
  // const sources = [
  //   { title: "video1: introduction to ReactJS" },
  //   { title: "video2: introduction to ReactJS" },
  //   { title: "video1: introduction to ReactJS" },
  //   { title: "video2: introduction to ReactJS" },
  // ];
  const subjects = [
    { id: 1, name: "Web" },
    { id: 2, name: "Cs" },
    { id: 3, name: "Test" },
  ];
  return (
    // <Card>
    //   <Subtitle subtitleHeader={subtitleHeader} sources={sources}></Subtitle>
    //   <Subtitle subtitleHeader={subtitleHeader} sources={sources}></Subtitle>
    //   <Subtitle subtitleHeader={subtitleHeader} sources={sources}></Subtitle>
    //   <Subtitle subtitleHeader={subtitleHeader} sources={sources}></Subtitle>
    // <SubjectFilter options={subjects}></SubjectFilter>
      <Modal>
        <Filters options={subjects} exchange="1"/>
      </Modal>
    // </Card>
  );
}
export default App;
