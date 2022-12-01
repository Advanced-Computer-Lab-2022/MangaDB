import "./App.css";
// import CourseCard from "./components/Course/CourseCard";
// import NavBar from "./components/NavBar";
// import PrimaryButton from "./components/PrimaryButton";
// import Subtitle from "./components/CourseSubtitles/Subtitle";
// import CountryManager from "./components/CountryManager";
// import HomePage from "./pages/HomePage";
// import AddUserForm from "./components/AddUserForm";
// import Filters from "./components/Filters/Filters";
// import SubjectFilter from "./components/Filters/SubjectFilter";
// import Modal from "./components/UI/Modal";
// import CourseDetailsPage from "./pages/CourseDetailsPage";
// import CourseCardListView from "./components/Course/CourseCardListView";
// import SearchResultsPage from "./pages/SearchResultsPage";
// import Filter from "./components/Filters/Filters";
// import Table from "./components/Table/Table";
// import Search from "./components/Search";
// import SecondaryButton from "./components/SecondaryButton";
// import TertiaryButton from "./components/TertiaryButton";
// import InstructorControls from "./components/Table/InstructorControls";
// import AddSubtitles from "./components/AddSubtitles/AddSubtitles"
// import IntructorCoursePage from "./pages/InstructorCoursesPage";
 import AddCoursePage from "./pages/AddCoursePage";
// import AdminAddNewUser from "./pages/AdminAddNewUser";
// import ExamManager from "./components/Exam/ExamManager"
// import InstructorCoursesPage from "./pages/InstructorCoursesPage";
// import CourseDetailsCardNew from "./components/Course/CourseDetailsCard";
import CourseDetailsPageNew from "./components/CourseDetailsComp/CourseDetailsPageNew";
import CourseViewPage from "./pages/CourseViewPage";
import InstructorProfilePage from "./pages/InstructorProfilePage";
import PasswordAndPrivacy from "./components/Profile/PasswordAndPrivacy";
import Billing from "./components/Profile/Billing";
import Reviews from "./components/Profile/Reviews/Reviews";
function App() {
  //return <CourseDetailsPageNew />
  //return <HomePage />;
//  return <InstructorProfilePage></InstructorProfilePage>
  //return <CourseViewPage />
//   const validatedLink =  validateYouTubeUrl("https://youtu.be/BgP30ML_Tc0");
//   console.log(validatedLink)
  return <AddCoursePage />
  //return  <Video isVisible={false} link="https://youtu.be/BgP30ML_Tc0"></Video>
//  return <ExamManager></ExamManager>
// return <AddCoursePage></AddCoursePage>
  // return <CourseViewPage></CourseViewPage>
}
export default App;