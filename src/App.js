import "./App.css";
import Navigation from "./Component/Navigation/Navigation";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from "./Component/LandingPage/Landing";
import SearchFor from "./Component/SearchFor/SearchFor";
import TopTutor from "./Component/TopTutor/TopTutor";
import SubjectList from "./Component/SubjectList/SubjectList";
import FindTutor from "./Component/FindTutor/FindTutor";
import Profile_Tutor from "./Component/Profile_Tutor/Profile_Tutor";
import TutorRegi from "./Component/TutorRegi/TutorRegi";
import ReqForTutor from "./Component/ReqForTutor/ReqForTutor";
import TuitionJob from "./Component/TuitionJob/TuitionJob";
import Dashboard from "./Component/Dashboard/Dashboard";
import Login from "./Component/Login/Login";
import MyProfile from "./Component/MyProfile/MyProfile";
import { AdminRoute, PrivateRoute } from "./Component/UseAuth";
import Footer from "./Component/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Faq from "./Component/FAQ/Faq";
import Feature from "./Component/Feature/Feature";
import Counter from "./Component/Counter/Counter";
import ScrollToTop from "./Component/ScrollToTop/ScrollToTop";
import Blog from "./Component/Blog/Blog";
import Admin from "./Component/Admin/Admin";
import BlogDetails from "./Component/Blog/BlogDetails";
import About from "./Component/About/About";
import Contact from "./Component/Contact/Contact";
function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="App">
      <Router>
        <ScrollToTop></ScrollToTop>
        <Switch>
          <Route exact path="/more-subject">
            <SubjectList></SubjectList>
          </Route>
          <Route exact path="/registration-tutor">
            <TutorRegi></TutorRegi>
          </Route>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/blog">
            <Blog></Blog>
            <Footer></Footer>
          </Route>
          <Route exact path="/about">
            <About></About>
          </Route>
          <Route exact path="/blog/:id">
            <BlogDetails></BlogDetails>
            <Footer></Footer>
          </Route>
          <PrivateRoute exact path="/my-profile">
            <MyProfile></MyProfile>
          </PrivateRoute>
          <Route exact path="/tuition-job">
            <TuitionJob></TuitionJob>
            <Footer></Footer>
          </Route>
          <Route exact path="/subject/:id">
            <FindTutor></FindTutor>
          </Route>
          <Route exact path="/profile/:id">
            <Profile_Tutor></Profile_Tutor>
          </Route>
          <Route exact path="/reqTutor">
            <ReqForTutor></ReqForTutor>
            <Footer></Footer>
          </Route>

          <AdminRoute exact path="/admin">
            <Admin></Admin>
          </AdminRoute>
          <Route exact path="/home">
            <Landing></Landing>
            <SearchFor></SearchFor>
            <Counter></Counter>
            <TopTutor></TopTutor>
            <Faq></Faq>
            <Contact></Contact>
            <Footer></Footer>
          </Route>
          <Route exact path="/">
            <Landing></Landing>
            <SearchFor></SearchFor>
            <Counter></Counter>
            <TopTutor></TopTutor>
            <Faq></Faq>
            <Contact></Contact>
            <Footer></Footer>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
