import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import InstructorProfilePage from "./pages/InstructorProfilePage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import CourseViewPage from "./pages/CourseViewPage";
import AdminAddNewUser from "./pages/AdminAddNewUser";
import InstructorCoursesPage from "./pages/InstructorCoursesPage";
import AddCoursePage from "./pages/AddCoursePage";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/UI/Footer/Footer";
import FAQS from "./pages/FAQS";
import InstructorWallet from "./pages/IntructorWallet";
import PageNotFound from "./pages/PageNotFound";
import UnAuthorizedPage from "./pages/UnAuthorizedPage";
import MyCourses from "./pages/MyCourses";
import AdminPage from "./components/Admin/AdminPage";
import InstructorPage from "./pages/InstructorPage";
import InstructorDashboard from "./pages/InstructorDashboard";
function App() {
  return (
    // <Fragment>
    //   <Routes>
    //     <Route path="/" element={<Login></Login>}></Route>
    //     <Route path="/signup" element={<SignUp></SignUp>}></Route>
    //     <Route
    //       path="/resetpassword"
    //       element={<ResetPassword></ResetPassword>}
    //     ></Route>
    //     <Route path="/home/:id" element={<HomePage></HomePage>}></Route>
    //     <Route
    //       path="/searchresults/:id"
    //       element={<SearchResultsPage></SearchResultsPage>}
    //     ></Route>
    //     <Route
    //       path="/coursedetails/:id"
    //       element={<CourseDetailsPage></CourseDetailsPage>}
    //     ></Route>
    //     <Route
    //       path="/courseview/:id"
    //       element={<CourseViewPage></CourseViewPage>}
    //     ></Route>
    //     <Route
    //       path="/profile/:id"
    //       element={<InstructorProfilePage></InstructorProfilePage>}
    //     ></Route>
    //     <Route
    //       path="/admin/:id"
    //       element={<AdminPage></AdminPage>}
    //     ></Route>
    //     <Route
    //       path="courses/:id"
    //       element={<InstructorCoursesPage></InstructorCoursesPage>}
    //     ></Route>
    //     <Route
    //       path="addcourse/:id"
    //       element={<AddCoursePage></AddCoursePage>}
    //     ></Route>
    //     <Route
    //       path="myWallet/:id"
    //       element={<InstructorWallet></InstructorWallet>}
    //     ></Route>
    //     <Route path="FAQS" element={<FAQS></FAQS>}></Route>
    //     <Route path="404" element={<PageNotFound></PageNotFound>}></Route>
    //     <Route
    //       path="403"
    //       element={<UnAuthorizedPage></UnAuthorizedPage>}
    //     ></Route>
    //     <Route path="myCourses" element={<MyCourses></MyCourses>}></Route>
    //     <Route
    //       path="InstructorPage"
    //       element={<InstructorPage></InstructorPage>}
    //     ></Route>
    //     <Route path = "instructorDashboard" element={<InstructorDashboard></InstructorDashboard>}></Route>
    //   </Routes>

    //   <Footer></Footer>
    // </Fragment>
    <InstructorDashboard />
  );
}
export default App;
