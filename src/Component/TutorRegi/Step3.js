import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import * as yup from 'yup';
import { auth } from '../FirebaseConfig';
import { UserContext } from '../Context/Sign_In_Context';
import { Subject } from '@material-ui/icons';
import { TeacherContext } from '../Context/TeacherList_Context';
import { API_URL } from '../../constants';
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);
const handleSchema = yup.object().shape({
  salary: yup.number().typeError('Salary must be a number').required('Salary is Required'),
});
const Step3 = ({ count, personal, education }) => {
  const [user, setUser] = useContext(UserContext);
  const [teacher, setTeacher] = useContext(TeacherContext);
  const [subject, setSubject] = useState({
    math: false,
    physics: false,
    chemistry: false,
    biology: false,
    history: false,
    english: false,
    geology: false,
    economics: false,
    accounting: false,
    marketing: false,
    finance: false,
  });
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(handleSchema),
  });
  const onSubmit = (data) => {
    data.tutor_subject = subject;
    data.star = 0;
    data.comments = [];
    data.available = true;
    if (member) {
      data.member = true;
    } else {
      data.member = false;
    }
    const finalData = {
      personal: personal,
      education: education,
      tuition: data,
    };
    setSpin(true);
    auth
      .createUserWithEmailAndPassword(personal.email, personal.password)
      .then((res) => {
        const { email } = res.user;
        const updateUser = {
          isSignIn: true,
          email: email,
        };
        setUser(updateUser);
        handlePost(finalData);
      })
      .catch((error) => {
        setSpin(false);
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const handlePost = (data) => {
    fetch(`${API_URL}/post/reg`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.text())
      .then((json) => {
        count(4);
        setSpin(false);
        const newArr = [...teacher, data];
        setTeacher(newArr);
      });
  };
  const [checked, setChecked] = React.useState(true);
  const [spin, setSpin] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleSubjectChange = (e) => {
    const name = e.target.name;
    if (e.target.checked) {
      const dup = { ...subject };
      dup[name] = e.target.checked;

      setSubject(dup);
    } else {
      const dup = { ...subject };
      dup[name] = e.target.checked;
      setSubject(dup);
    }
  };
  const client = {
    sandbox: 'ARumogbdoLmSlPkL_zC41SjxA1oETyuZzTuj4qn9lcaQRjv-zEe0HO5H4cX5G-7Yxd_A4G3OpOOrl2cJ',
    production: 'YOUR-PRODUCTION-APP-ID',
  };
  let env = 'sandbox';
  const [member, setMember] = useState(false);
  const onSuccess = (payment) => {
    setMember(true);
  };
  const onError = (err) => {
    alert(err);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* educational history */}
      <div>
        <h2>Step 3</h2>
        <BorderLinearProgress variant="determinate" value={90} />
        <h3>Tuition Information</h3>
        <div>
          <label htmlFor="">I can teach:</label>
          <div>
            <input type="checkbox" name="math" onChange={(e) => handleSubjectChange(e)} />
            <label htmlFor="math">Math</label>
          </div>
          <div>
            <input type="checkbox" name="physics" onChange={(e) => handleSubjectChange(e)} />
            <label htmlFor="math">Physics</label>
          </div>
          <div>
            <input type="checkbox" name="chemistry" onChange={(e) => handleSubjectChange(e)} />
            <label htmlFor="math">Chemistry</label>
          </div>
          <div>
            <input type="checkbox" name="biology" onChange={(e) => handleSubjectChange(e)} />
            <label htmlFor="math">Biology</label>
          </div>
          <div>
            <input type="checkbox" name="history" onChange={(e) => handleSubjectChange(e)} />
            <label htmlFor="math">History</label>
          </div>
          <div>
            <input type="checkbox" name="english" onChange={(e) => handleSubjectChange(e)} />
            <label htmlFor="math">English</label>
          </div>
          <div>
            <input type="checkbox" name="geology" onChange={(e) => handleSubjectChange(e)} />
            <label htmlFor="math">Geology</label>
          </div>
          <div>
            <input type="checkbox" name="economics" onChange={(e) => handleSubjectChange(e)} />
            <label htmlFor="math">Economics</label>
          </div>
          <div>
            <input type="checkbox" name="accounting" onChange={(e) => handleSubjectChange(e)} />
            <label htmlFor="math">Accounting</label>
          </div>
          <div>
            <input type="checkbox" name="marketing" onChange={(e) => handleSubjectChange(e)} />
            <label htmlFor="math">Marketing</label>
          </div>
          <div>
            <input type="checkbox" name="finance" onChange={(e) => handleSubjectChange(e)} />
            <label htmlFor="math">Finance</label>
          </div>
        </div>
        <div>
          <label htmlFor="days_per_week">Days Per Week</label>
          <select name="days_per_week" defaultValue="3" ref={register}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <input
            type="number"
            placeholder="Salary Per Month"
            name="salary"
            ref={register}
            style={errors.salary && { border: '1px solid red' }}
          />
        </div>
        <div>
          <p style={{ color: 'red' }}>{errors.days_per_week?.message}</p>
          <p style={{ color: 'red' }}>{errors.salary?.message}</p>
        </div>
        <div>
          <input
            type="text"
            name="video"
            placeholder="Your Demo Video Lecture link"
            ref={register}
          />
          <label htmlFor="prefer_class">Preferred Classes</label>
          <select name="prefer_class" defaultValue="Any" ref={register}>
            <option value="Any">Any Class</option>
            <option value="Class 1 - Class 5">Class 1 - Class 5</option>
            <option value="Class 1 - Class 9">Class 1 - Class 9</option>
            <option value="Class 5 - Class 9">Class 5 - Class 9</option>
            <option value="SSC/DAKHIL/A-LABEL">SSC/ DAKHIL / A-LABEL</option>
            <option value="HSC/ALIM/O-LABEL">HSC / ALIM / O-LABEL</option>
          </select>
          <label htmlFor="medium">Preferred Medium :</label>
          <select name="medium" defaultValue="Bangle" ref={register}>
            <option value="Bangle">Bangla</option>
            <option value="English">English</option>
            <option value="Both">Both</option>
          </select>
        </div>
      </div>
      <div>
        <h4>Want to be a premiere member?</h4>
        <p></p>
        {member ? (
          <h2 style={{ color: 'green' }}>Congratulations Your Payment Successfully Paid</h2>
        ) : (
          <PaypalExpressBtn
            env={env}
            client={client}
            currency={'USD'}
            total={10}
            onError={onError}
            onSuccess={onSuccess}
          />
        )}
      </div>
      {spin ? (
        <section style={{ background: 'white', padding: '10px' }}>
          <CircularProgress color="primary" />
        </section>
      ) : (
        <div className="two_btn">
          <Button color="secondary" variant="contained" onClick={() => count(2)}>
            Back
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </div>
      )}
    </form>
  );
};
export default Step3;
