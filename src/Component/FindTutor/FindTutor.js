import { Button, Card, Grid, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./FindTutor.css";
import CardBox from "../CardBox/CardBox";
import { TeacherContext } from "../Context/TeacherList_Context";
const FindTutor = () => {
  const [tutor, setTutor] = useState([]);
  const [teacher, setTeacher] = useContext(TeacherContext);
  const { id } = useParams();
  const [sub, setSub] = useState(null);
  useEffect(() => {
    const data = teacher.filter((x) => {
      const sub = Object.keys(x.tuition.tutor_subject);
      const val = Object.values(x.tuition.tutor_subject);
      const match = sub.filter((y, index) => {
        if (val[index] === true) {
          return y;
        }
      });
      const isOk = match.find((z) => {
        if (z === id.toLowerCase()) {
          return z;
        }
      });
      if (isOk) {
        return x;
      }
    });
    setTutor(data);
  }, [teacher]);
  useEffect(() => {
    if (id === "all") {
      setTutor(teacher);
    }
  }, [id, teacher]);
  useEffect(() => {
    document.querySelector("body").classList.remove("no__scroll");
  }, []);
  console.log(tutor);
  const handleTutor = (e) => {
    e.preventDefault();
    const newSub = sub[0].toLowerCase() + sub.slice(1).toLowerCase();
    const data = teacher.filter((x) => {
      const sub = Object.keys(x.tuition.tutor_subject);
      const val = Object.values(x.tuition.tutor_subject);
      const match = sub.filter((y, index) => {
        if (val[index] === true) {
          return y;
        }
      });
      const isOk = match.find((z) => {
        if (z === newSub) {
          return z;
        }
      });
      if (isOk) {
        return x;
      }
    });
    setTutor(data);
  };

  return (
    <div className="findTutor">
      <Navigation></Navigation>
      <div>
        <form onSubmit={handleTutor}>
          <input
            type="text"
            placeholder="What are you looking for ? Example: Math"
            onChange={(e) => setSub(e.target.value)}
          />
          {sub && <Button type="submit">Find Tutor</Button>}
          {!sub && (
            <Button type="submit" disabled>
              Find Tutor
            </Button>
          )}
        </form>
      </div>
      <p style={{ color: "white" }}>Search Result : {tutor?.length}</p>
      <Grid container>
        {tutor.map((x) => (
          <Grid xs={12} sm={6} md={4}>
            <CardBox
              id={x._id}
              img={x.personal.img}
              name={x.personal.name}
              star={x.tuition.star.toFixed(2)}
              subject={x.education.subject}
              other={x.tuition.tutor_subject}
              inst={x.education.institution}
              verified={x.tuition.member}
            ></CardBox>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FindTutor;
