import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Register() {
  const initData = {
    Name: "",
    Username: "",
    Email: "",
    Password: "",
    
  };
  const [registerForm, setRegisterForm] = useState(initData);
  const [registerFormError, setRegisterFormError] = useState(initData);
  const navigate = useNavigate();
  const ChangeHandler = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };
  const saveClick = () => {
    //alert(registerForm.UserName);
    let hasError = false;
    let messages = initData;
    if (registerForm.Name.trim().length === 0) {
      hasError = true;
      messages = { ...messages, Name: "Name Empty" };
    }
    if (registerForm.Email.trim().length === 0) {
      hasError = true;
      messages = { ...messages, Email: "Email Empty" };
    }
    if (registerForm.Username.trim().length === 0) {
      hasError = true;
      messages = { ...messages, Username: "UserName Empty" };
    }
    if (registerForm.Password.trim().length === 0) {
      hasError = true;
      messages = { ...messages, Password: "Password Empty" };
    }
    if (hasError) setRegisterFormError(messages);
    else {
      setRegisterFormError(initData);
      axios
        .post(
          "https://localhost:7228/api/Authorization/Registration/",
          registerForm
        )
        .then((d) => {
          if (d.data) {
            alert("Register Successfully");
            navigate("/login");
          } else {
            alert("Something Went Wrong");
            setRegisterForm(initData);
          }
        })
        .catch((e) => {
          alert(JSON.stringify(e));
          setRegisterForm(initData);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="row col-lg-6 mx-auto m-2 p-2">
        <div className="card text-center">
          <div className="card-header text-success">Register</div>
          <div className="card-body">
            <div className="form-group row">
              <label className="col-lg-4" for="txtname">
                Name
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  id="txtname"
                  placeholder="Enter Name"
                  name="Name"
                  onChange={ChangeHandler}
                  className="form-control"
                ></input>
                <p className="text-danger">{registerFormError.Name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4" for="txtemail">
                Email
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  id="txtemail"
                  placeholder="Enter Email"
                  name="Email"
                  onChange={ChangeHandler}
                  className="form-control"
                ></input>
                <p className="text-danger">{registerFormError.Email}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4" for="txtusername">
                Username
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  id="txtusername"
                  placeholder="Enter UserName"
                  name="Username"
                  onChange={ChangeHandler}
                  className="form-control"
                ></input>
                <p className="text-danger">{registerFormError.Username}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4" for="txtpassword">
                Password
              </label>
              <div className="col-lg-8">
                <input
                  type="password"
                  id="txtpassword"
                  placeholder="Password"
                  name="Password"
                  onChange={ChangeHandler}
                  className="form-control"
                ></input>
                <p className="text-danger">{registerFormError.Password}</p>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            <button onClick={saveClick} className="btn btn-info">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
