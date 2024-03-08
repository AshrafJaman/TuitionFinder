import { Avatar, Button, Modal } from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Navigation from '../Navigation/Navigation';
import StarsIcon from '@material-ui/icons/Stars';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import Slider from 'react-slick';
import Feedback from '../Feedback/Feedback';
import ContactForm from '../ContactForm/ContactForm';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import { TeacherContext } from '../Context/TeacherList_Context';
import { UserContext } from '../Context/Sign_In_Context';
import EditIcon from '@material-ui/icons/Edit';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import Verification from '../Email/Verification';
import { API_URL } from '../../constants';
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: '40px 0px 5px 0px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const MyProfile = () => {
  const [pro, setPro] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [snack, setSnack] = useState(false);
  const [contact, setContact] = useState(true);
  const [teacher, setTeacher] = useContext(TeacherContext);
  const [user, setUser] = useContext(UserContext);
  const client = {
    sandbox: 'ARumogbdoLmSlPkL_zC41SjxA1oETyuZzTuj4qn9lcaQRjv-zEe0HO5H4cX5G-7Yxd_A4G3OpOOrl2cJ',
    production: 'YOUR-PRODUCTION-APP-ID',
  };
  let env = 'sandbox';
  const onSuccess = (payment) => {
    alert('congratulations');
    fetch(`${API_URL}/update/verify/${user.email}`, {
      method: 'PATCH',
      body: JSON.stringify({
        member: true,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.text())
      .then((json) => {
        const newArr = teacher.filter((x) => {
          if (x.personal.email === user.email) {
            x.tuition.member = true;
            return x;
          } else {
            return x;
          }
        });
        setTeacher(newArr);
      });
  };
  const onError = (err) => {
    alert(err);
  };
  useEffect(() => {
    const newArr = teacher.find((x) => x.personal.email === user.email);
    setPro(newArr);
  }, [teacher]);
  useEffect(() => {
    document.querySelector('body').classList.remove('no__scroll');
  }, []);
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
  console.log(pro);
  return (
    <div>
      {!user.emailVerified && <Verification></Verification>}
      {user.emailVerified && (
        <div className="profile">
          <Navigation></Navigation>
          <div className="profileTop">
            <Avatar
              src={pro?.personal?.img}
              alt={pro?.personal?.fullName}
              className={classes.large}
            ></Avatar>
            <div>
              <h2>
                {pro?.personal?.fullName}{' '}
                {pro?.tuition?.member && <VerifiedUserIcon className="verified"></VerifiedUserIcon>}
              </h2>
              <p style={{ marginBottom: '10px' }}>
                {pro?.education?.subject} @ {pro?.education?.institution}
              </p>
              {pro?.verified && (
                <div className="verified_user">
                  <h4>
                    <EmailIcon></EmailIcon> {pro.email}
                  </h4>
                  <h4>
                    <CallIcon></CallIcon> {pro.mobile}
                  </h4>
                </div>
              )}

              <div>
                <Button onClick={() => handleOpen('update')}>
                  <EditIcon></EditIcon> Update Profile
                </Button>
                <span>
                  <StarsIcon></StarsIcon> {pro?.tuition?.star.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
          <div className="profileBottom">
            <div>
              <h3 style={{ textTransform: 'uppercase' }}>ABOUT {pro?.personal?.fullName}</h3>
              <p>{pro?.personal?.about}</p>
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
              <h3>REVIEWS</h3>
              <Slider {...settings}>
                {pro?.tuition?.comments &&
                  pro?.tuition?.comments.map((x) => (
                    <Feedback name={x.name} review={x.feedback} rating={x.rating}></Feedback>
                  ))}
              </Slider>
              <small style={{ color: 'white' }}>
                Number of Reviews {pro?.tuition?.comments?.length}
              </small>
            </div>
          </div>
          {!pro?.tuition?.member && (
            <div className="payPal_box">
              <h4>Want To be a Member Of Tuition Finder Family ?</h4>
              <PaypalExpressBtn
                env={env}
                client={client}
                currency={'USD'}
                total={10}
                onError={onError}
                onSuccess={onSuccess}
              />
            </div>
          )}
          <Modal className={classes.modal} open={open} onClose={handleClose}>
            <div className="modal">
              <div>
                <div>
                  <Link to="/">
                    {' '}
                    <i>tuition finder</i>
                  </Link>
                  <h3>
                    <i>Thanks For Your Interest</i>
                  </h3>
                </div>
              </div>
              <div>
                <ContactForm
                  handleClose={handleClose}
                  handleSnack={handleSnack}
                  contact={contact}
                  profile={pro}
                  setPro={setPro}
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
      )}
    </div>
  );
};

export default MyProfile;
