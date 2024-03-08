import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./TutorRegi.css";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
const TutorRegi = () => {
  const [step, setStep] = useState(1);
  const [personal, setPersonal] = useState("");
  const [education, setEducation] = useState("");
  useEffect(() => {
    document.querySelector("body").classList.remove("no__scroll");
  }, []);
  return (
    <div className="tutorRegi">
      <Navigation></Navigation>
      {step === 1 && (
        <Step1
          count={setStep}
          personal={personal}
          setPersonal={setPersonal}
        ></Step1>
      )}
      {step === 2 && (
        <Step2
          education={education}
          setEducation={setEducation}
          count={setStep}
        ></Step2>
      )}
      {step === 3 && (
        <Step3
          personal={personal}
          education={education}
          count={setStep}
        ></Step3>
      )}
      {step === 4 && <Step4></Step4>}
    </div>
  );
};

export default TutorRegi;
