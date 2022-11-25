import "./App.css";

import CourseCard from "./components/Course/CourseCard";
import NavBar from "./components/NavBar";
import PrimaryButton from "./components/PrimaryButton";
import Subtitle from "./components/CourseSubtitles/Subtitle";
import CountryManager from "./components/CountryManager";
import HomePage from "./pages/HomePage";
import AddUserForm from "./components/AddUserForm";
import Filters from "./components/Filters/Filters";
import SubjectFilter from "./components/Filters/SubjectFilter";
import Modal from "./components/UI/Modal";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import CourseCardListView from "./components/Course/CourseCardListView";
import SearchResultsPage from "./pages/SearchResultsPage";
import Filter from "./components/Filters/Filters";
import Table from "./components/Table/Table";
import Search from "./components/Search";
import SecondaryButton from "./components/SecondaryButton";
import TertiaryButton from "./components/TertiaryButton";
import InstructorControls from "./components/Table/InstructorControls";
import AddSubtitles from "./components/AddSubtitles/AddSubtitles"
import IntructorCoursePage from "./pages/InstructorCoursesPage";
import AddCoursePage from "./pages/AddCoursePage";
import AdminAddNewUser from "./pages/AdminAddNewUser";
import ExamManager from "./components/Exam/ExamManager"
import InstructorCoursesPage from "./pages/InstructorCoursesPage";
import Video from "./components/Video/Video";
import CreateExamChoices from "./components/AddSubtitles/CreateQuestion/CreateExamChoices";
import CreateQuestionForm from "./components/AddSubtitles/CreateQuestion/CreateQuestionForm";
import QuestionSolution from "./components/AddSubtitles/CreateQuestion/QuestionSolution";
import CreateExamManager from "./components/AddSubtitles/CreateQuestion/CreateExamManager"
function App() {
  
//   const validatedLink =  validateYouTubeUrl("https://youtu.be/BgP30ML_Tc0");
//   console.log(validatedLink)
  
  //return  <Video isVisible={false} link="https://youtu.be/BgP30ML_Tc0"></Video>
//  return <ExamManager></ExamManager>
return <AddCoursePage></AddCoursePage>
}

export default App;
