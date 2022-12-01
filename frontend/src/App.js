import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import InstructorProfilePage from "./pages/InstructorProfilePage";
import CourseDetailsPageNew from "./pages/CourseDetailsPageNew";
import CourseViewPage from "./pages/CourseViewPage";
import AdminAddNewUser from "./pages/AdminAddNewUser";
import InstructorCoursesPage from "./pages/InstructorCoursesPage";
import AddCoursePage from "./pages/AddCoursePage";
import SignUp from "./pages/SignUp";
function App() {
  return (
    //navbar should be here
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/signup" element = {<SignUp></SignUp>}></Route>
      <Route path="/home/:id" element={<HomePage></HomePage>}></Route>
      <Route
        path="/searchresults/:id"
        element={<SearchResultsPage></SearchResultsPage>}
      ></Route>
      <Route
        path="/coursedetails/:id"
        element={<CourseDetailsPageNew></CourseDetailsPageNew>}
      ></Route>
      <Route
        path="/courseview/:id"
        element={<CourseViewPage></CourseViewPage>}
      ></Route>
      <Route
        path="/profile/:id"
        element={<InstructorProfilePage></InstructorProfilePage>}
      ></Route>
      <Route
        path="/admin/:id"
        element={<AdminAddNewUser></AdminAddNewUser>}
      ></Route>
      <Route
        path="courses/:id"
        element={<InstructorCoursesPage></InstructorCoursesPage>}
      ></Route>
      <Route
        path="addcourse/:id"
        element={<AddCoursePage></AddCoursePage>}
      ></Route>
    </Routes>
  );
}
export default App;
