import { Button } from "@material-ui/core";
import { auth } from "../FirebaseConfig";
import React, { useState } from "react";
import Navigation from "../Navigation/Navigation";
import "./Verification.css";
const Verification = () => {
  const [ok, setOk] = useState(false);
  const send = () => {
    var user = auth.currentUser;

    user
      .sendEmailVerification()
      .then(function () {
        setOk(true);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };
  return (
    <div className="Verification">
      {!ok && (
        <div>
          <h3>Please Verify you email address to complete your registration</h3>{" "}
          <Button color="primary" variant="contained" onClick={() => send()}>
            Send Verification Email
          </Button>
        </div>
      )}
      {ok && (
        <div>
          <h3>Email Verification Link Send</h3>{" "}
          <a href="/">
            <Button color="primary" variant="contained">
              Ok
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Verification;
