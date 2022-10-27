import "./App.css";
import CourseCard from "./components/Course/CourseCard";
import NavBar from "./components/NavBar";
import PrimaryButton from "./components/PrimaryButton";
import Subtitle from "./components/CourseSubtitles/Subtitle";
import CountryManager from "./components/CountryManager";
import HomePage from "./containers/HomePage";
import Filter from "./components/Filters/Filters";
import Modal from "./components/UI/Modal";
import Table from "./components/Table/Table";
import Search from "./components/Search";
import SecondaryButton from "./components/SecondaryButton";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
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
    { id: 1, name: "Web" },
    { id: 2, name: "AI" },
    { id: 3, name: "Front" },
    { id: 4, name: "END" },
  ];
  const courses = [
    {
      courseID: "1",
      instructorName: "Jane Cooper",
      courseTitle: "Regional Paradigm Technician",
      price: "40$",
      subject: "Machine Learning",
    },
    {
      courseID: "2",
      instructorName: "Cody Fisher",
      courseTitle: "Product Directives Officer",
      price: "20$",
      subject: "Business Analytics",
    },
    {
      courseID: "3",
      instructorName: "Omar Moataz",
      courseTitle: "Testing and Maintaining",
      price: "50$",
      subject: "Database Administratation",
    },
    {
      courseID: "4",
      instructorName: "Michel Roauf",
      courseTitle: "Ape Daily Life",
      price: "Free",
      subject: "Rise of the apes",
    },
  ];

  const icon = <TuneOutlinedIcon className="ml-2" />;

  return (
    // <CourseCard {...test}>

    // </CourseCard>
    <div>
      {/* <NavBar />
      <HomePage /> */}
      {/* <NavBar /> */}
      {/* <Subtitle subtitleHeader={subtitleHeader} sources={sources}></Subtitle>
      <Subtitle subtitleHeader={subtitleHeader2} sources={sources}></Subtitle>
      <Subtitle subtitleHeader={subtitleHeader3} sources={sources}></Subtitle>
      <Subtitle subtitleHeader={subtitleHeader4} sources={sources}></Subtitle> */}
      {/* <Modal>
        <Filter options={options} exchange={1}></Filter>
        </Modal> */}
      <NavBar />
      <div className="my-6 flex justify-center space-x-6 items-center">
        <div>
          <Search />
        </div>
        <div>
          <SecondaryButton text="Filter" icon={icon}></SecondaryButton>
        </div>
      </div>
      <Table rows={courses}></Table>
    </div>
  );
}
export default App;
