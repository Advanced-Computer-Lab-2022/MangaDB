import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import InstructorProfilePage from "./pages/InstructorProfilePage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import CourseViewPage from "./pages/CourseViewPage";
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
import TraineeProfilePage from "./pages/TraineeProfilePage";
import AdminPage from "./components/Admin/AdminPage";
import InstructorPage from "./pages/InstructorPage";
import InstructorDashboard from "./pages/InstructorDashboard";
import InstructorCourseDetails from "./pages/InstructorCourseDetails";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SuccessfulPayment from "./components/Payment/SuccessfulPayment";
import UnsuccessfulPayment from "./components/Payment/UnsuccessfulPayment";
import SuccessfulPaymentWallet from "./components/Payment/SuccessfulPaymentWallet";
function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route
          path="/resetpassword"
          element={<ResetPassword></ResetPassword>}
        ></Route>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/searchresults"
          element={<SearchResultsPage></SearchResultsPage>}
        ></Route>
        <Route
          path="/coursedetails"
          element={<CourseDetailsPage></CourseDetailsPage>}
        ></Route>
        <Route
          path="/courseview"
          element={<CourseViewPage></CourseViewPage>}
        ></Route>
        <Route
          path="/profileInstructor"
          element={<InstructorProfilePage></InstructorProfilePage>}
        ></Route>
        <Route
          path="/profileTrainee"
          element={<TraineeProfilePage></TraineeProfilePage>}
        ></Route>
        <Route path="/admin" element={<AdminPage></AdminPage>}></Route>
        <Route
          path="/courses"
          element={<InstructorCoursesPage></InstructorCoursesPage>}
        ></Route>
        <Route
          path="/addcourse"
          element={<AddCoursePage></AddCoursePage>}
        ></Route>
        <Route
          path="/myWallet"
          element={<InstructorWallet></InstructorWallet>}
        ></Route>
        <Route path="/FAQS" element={<FAQS></FAQS>}></Route>
        <Route path="/404" element={<PageNotFound></PageNotFound>}></Route>
        <Route
          path="/403"
          element={<UnAuthorizedPage></UnAuthorizedPage>}
        ></Route>
        <Route path="/myCourses" element={<MyCourses></MyCourses>}></Route>
        <Route
          path="/InstructorPage"
          element={<InstructorPage></InstructorPage>}
        ></Route>
        <Route
          path="/instructorDashboard"
          element={<InstructorDashboard></InstructorDashboard>}
        ></Route>
        <Route
          path="instructorCourseDetails"
          element={<InstructorCourseDetails></InstructorCourseDetails>}
        ></Route>
        <Route
          path="/forgotPassword"
          element={<ForgotPasswordPage></ForgotPasswordPage>}
        ></Route>

        <Route
          path="/successfulPayment"
          element={<SuccessfulPayment></SuccessfulPayment>}
        ></Route>
        <Route
          path="/unsuccessfulPayment"
          element={<UnsuccessfulPayment></UnsuccessfulPayment>}
        ></Route>
        <Route path="/resetpassword" element={<ResetPassword></ResetPassword>}></Route>
        <Route path="successwallet" element={<SuccessfulPaymentWallet></SuccessfulPaymentWallet>}></Route>
      </Routes>
      <Footer></Footer>
    </Fragment>
  );
}
export default App;
