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
function App() {
  function validateYouTubeUrl(url)
{
    var url = url
        if (url != undefined || url != '') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                // Do anything for being valid
                return true;
                // if need to change the url to embed url then use below line
               // ('#ytplayerSide').attr('src', 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0');
            }
            else {
                return false
            }
        }
}

//   const validatedLink =  validateYouTubeUrl("https://youtu.be/BgP30ML_Tc0");
//   console.log(validatedLink)
  
  //return  <Video isVisible={false} link="https://youtu.be/BgP30ML_Tc0"></Video>
 return <AddCoursePage></AddCoursePage>

}

export default App;
