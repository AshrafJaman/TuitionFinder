import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import Navigation from "../Navigation/Navigation";
import { auth } from "../FirebaseConfig";
import { UserContext } from "../Context/Sign_In_Context";
import { useHistory } from "react-router-dom";
const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [user, setUser] = useContext(UserContext);
  const [err, setErr] = useState(null);
  let history = useHistory();
  const onSubmit = (data) => {
    handleSignIn(data.email, data.password);
  };
  useEffect(() => {
    if (user) {
      history.push("/my-profile");
    }
  }, [user]);
  const handleSignIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(function (res) {
        if (res) {
          console.log(res);
          const { email, emailVerified } = res.user;
          const updateUser = {
            isSignIn: true,
            email: email,
            emailVerified,
          };
          setUser(updateUser);
          history.push("/my-profile");
        }
      })
      .catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
  console.log(user, "login");
  return (
    <div className="login">
      <Navigation></Navigation>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Welcome Back !</h2>
          <input
            type="text"
            name="email"
            placeholder="E-mail *"
            style={errors.email && { border: "1px solid red" }}
            ref={register({
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <p style={{ color: "red" }}>{errors.email && errors.email.message}</p>
          <input
            type="password"
            name="password"
            placeholder="Password *"
            style={errors.password && { border: "1px solid red" }}
            ref={register({ required: "This is Required", minLength: 6 })}
          />
          <p style={{ color: "red" }}>
            {errors.password?.type === "required" && "Your input is required"}
          </p>
          <p style={{ color: "red" }}>
            {errors.password?.type === "minLength" &&
              "Password must be min Length of 6"}
          </p>
          {err && <p style={{ color: "red" }}>{err}</p>}
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
