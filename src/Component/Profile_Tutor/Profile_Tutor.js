import { Avatar, Button, Modal } from "@material-ui/core";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Profile_Tutor.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { teacher } from "../fakedata";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Navigation from "../Navigation/Navigation";
import StarsIcon from "@material-ui/icons/Stars";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import Slider from "react-slick";
import Feedback from "../Feedback/Feedback";
import ContactForm from "../ContactForm/ContactForm";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import EmailIcon from "@material-ui/icons/Email";
import CallIcon from "@material-ui/icons/Call";
import { TeacherContext } from "../Context/TeacherList_Context";
import { UserContext } from "../Context/Sign_In_Context";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    margin: "40px 0px 5px 0px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Profile_Tutor = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useContext(TeacherContext);
  const [pro, setPro] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [snack, setSnack] = useState(false);
  const [contact, setContact] = useState(true);
  const [tutorCan, setTutorCan] = useState([]);
  const [user, setUser] = useContext(UserContext);
  useEffect(() => {
    const newArr = teacher.find((x) => x._id === id);
    setPro(newArr);
  }, [id, teacher]);
  useEffect(() => {
    if (pro) {
      const sub = Object.keys(pro.tuition.tutor_subject);
      const val = Object.values(pro.tuition.tutor_subject);
      const double_arr = sub.map((x, index) => {
        return [sub[index], val[index]];
      });
      setTutorCan(double_arr);
    }
  }, [pro]);
  const classes = useStyles();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleOpen = (i) => {
    setOpen(true);
    setContact(i);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSnack = (msg) => {
    setSnack(msg);
  };
  const handleSnackClose = () => {
    setSnack(false);
  };
  return (
    <div className="profile">
      <Navigation></Navigation>
      <div className="profileTop">
        <Avatar
          src={pro?.personal?.img}
          alt={pro?.personal?.name}
          className={classes.large}
        ></Avatar>
        <div>
          <h2>
            {pro?.personal?.fullName}{" "}
            {pro?.tuition?.member && (
              <VerifiedUserIcon className="verified"></VerifiedUserIcon>
            )}
          </h2>
          <p>
            {pro?.education?.subject} @ {pro?.education?.institution}
          </p>
          {(pro?.tuition?.member ||
            user?.email === "ashrafjaman247@gmail.com") && (
            <div className="verified_user">
              <h4>
                <EmailIcon></EmailIcon> {pro?.personal?.email}
              </h4>
              <h4>
                <CallIcon></CallIcon> {pro?.personal?.mobile}
              </h4>
            </div>
          )}

          <span style={{ color: "white" }}>I can teach :</span>
          {tutorCan.length !== 0 &&
            tutorCan.map((x, index) => {
              if (x[1] === true) {
                return <Button>{x[0]}</Button>;
              } else {
                return console.log("alur dom");
              }
            })}
          <div>
            <Button onClick={() => handleOpen("contact")}>
              Contact With Me
            </Button>
            <span>
              <StarsIcon></StarsIcon>{" "}
              {pro?.tuition?.star !== 0 && pro?.tuition?.star?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="profileBottom">
        <div>
          <h3 style={{ textTransform: "uppercase" }}>
            ABOUT {pro?.personal?.fullName}
          </h3>
          <p>{pro?.personal?.about}</p>
          {pro?.tuition?.video && (
            <a href={`${pro.tuition.video}`}>
              <Button>View My Demo Lecture</Button>
            </a>
          )}
        </div>
        <div>
          <h3>EDUCATION & CERTIFICATES</h3>
          <ul>
            <li>
              <CheckCircleRoundedIcon></CheckCircleRoundedIcon>
              <div>
                <p>{pro?.education?.ssc}</p>
                <p>{pro?.education?.ssc_inst}</p>
              </div>
              <div>
                <small>GPA : {pro?.education?.ssc_gpa}</small>
                <br />
                <small>Group : {pro?.education?.ssc_group}</small>
              </div>
            </li>
            {pro?.education?.hsc && (
              <li>
                <CheckCircleRoundedIcon></CheckCircleRoundedIcon>
                <div>
                  <p>{pro?.education?.hsc}</p>
                  <p>{pro?.education?.hsc_inst}</p>
                </div>
                <div>
                  <small>GPA : {pro?.education?.hsc_gpa}</small>
                  <br />
                  <small>Group : {pro?.education?.hsc_group}</small>
                </div>
              </li>
            )}
            {pro?.education?.hon_inst && (
              <li>
                <CheckCircleRoundedIcon></CheckCircleRoundedIcon>
                <div>
                  <p>HONOURS</p>
                  <p>{pro?.education?.hon_inst}</p>
                </div>
                <div>
                  <small>CGPA : {pro?.education?.hon_cgpa}</small>
                  <br />
                  <small>Group : {pro?.education?.hon_dept}</small>
                </div>
              </li>
            )}
          </ul>
          <h3>TUITION REQUIREMENT</h3>
          <ul>
            <li>
              <CheckCircleRoundedIcon></CheckCircleRoundedIcon>
              <div>
                <p>Prefer Student Class</p>
              </div>
              <div>
                <small>{pro?.tuition?.prefer_class}</small>
              </div>
            </li>
            <li>
              <CheckCircleRoundedIcon></CheckCircleRoundedIcon>
              <div>
                <p>Prefer Student Medium</p>
              </div>
              <div>
                <small>{pro?.tuition?.medium}</small>
              </div>
            </li>
            <li>
              <CheckCircleRoundedIcon></CheckCircleRoundedIcon>
              <div>
                <p>Days Per Week</p>
              </div>
              <div>
                <small>{pro?.tuition?.days_per_week}</small>
              </div>
            </li>
            <li>
              <CheckCircleRoundedIcon></CheckCircleRoundedIcon>
              <div>
                <p>Expected Salary</p>
              </div>
              <div>
                <small>{pro?.tuition?.salary} Tk Per Month</small>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="upperFeed">
        <div className="feed">
          <h3>Reviews</h3>
          <Slider {...settings}>
            {pro?.tuition?.comments &&
              pro.tuition.comments.map((x) => (
                <Feedback
                  name={x.name}
                  review={x.feedback}
                  rating={x.rating}
                ></Feedback>
              ))}
          </Slider>
          <small style={{ color: "white" }}>
            Number of Review {pro?.tuition?.comments?.length}
          </small>
          <div>
            <Button variant="outlined" onClick={() => handleOpen("feedback")}>
              Give a Feedback
            </Button>
          </div>
        </div>
      </div>
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <div className="modal">
          <div>
            <div>
              <Link to="/">
                {" "}
                <h2 style={{ fontSize: "35px" }}>Tuition Finder</h2>
              </Link>
              <h3>
                <i>Thanks For Your Interest</i>
              </h3>
            </div>
          </div>
          <div className="close__modal__boss">
            <span className="close__modal" onClick={handleClose}>
              <CloseIcon></CloseIcon>
            </span>
            <ContactForm
              id={id}
              comments={pro?.tuition?.comments}
              handleClose={handleClose}
              handleSnack={handleSnack}
              contact={contact}
              star={pro?.tuition?.star}
              contacts={pro?.contacts}
            ></ContactForm>
          </div>
        </div>
      </Modal>
      <Snackbar open={snack} autoHideDuration={4000} onClose={handleSnackClose}>
        <Alert severity="success" onClose={handleSnackClose}>
          {snack}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile_Tutor;
