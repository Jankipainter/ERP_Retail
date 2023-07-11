import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../scss/login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({ email: "", password: "" });
  const [formErrors, setformErrors] = useState({
    email: "",
    password: "",
  });
  const [isSubmit, setisSubmit] = useState(false);

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const validate = (values) => {
    let errors = {};

    errors.email = user.email
      ? // eslint-disable-next-line
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email)
        ? ""
        : "Please, Provide valid email !"
      : "Email is Required !";

    errors.password = user.password
      ? user.password.length < 5
        ? "Password must include more than 5 char"
        : ""
      : "Password is Required !";

    return errors;
  };
  useEffect(()=>{
    if(localStorage.getItem("token") && localStorage.getItem("username")){
     navigate('/home/dashboard')
    }
  },[])
  useEffect(() => {
    if (formErrors.password === "" && formErrors.email === "" && isSubmit) {
      postData();
    }
    //eslint-disable-next-line
  }, [formErrors]);

  const postData = async () => {
    const host = "http://localhost:5000";
    const body = JSON.stringify({
      email: user.email,
      password: user.password,
    });
    const url = `${host}/user/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("username",json.user.username)
      navigate("/home/dashboard");
    } else {
      toast.error(json.error, toastOptions);
    }
  };
  const onChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  // useEffect(() => {
  //     if(localStorage.getItem('token')!=null){

  //     }
  //     else{
  // navigate("/login");
  //     }

  //   }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setisSubmit(true);
    setformErrors(validate());
  };

  return (
    <>
      <ToastContainer />
      <div className="logincomponent">
        <div className="main_header"> ERP System</div>
        <div className="container">
          <div className="left">
            <div className="header">
              <h2>Sign In</h2>
            </div>
            <div className="form">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                required
                className="form-field animation a3"
                id="email"
                placeholder="Email Address"
                name="email"
                onChange={onChange}
              />
              <span className="errorText">{formErrors.email}</span>
              <label htmlFor="password">Password</label>
              <input
                required
                className="form-field "
                name="password"
                placeholder="Password"
                type="password"
                onChange={onChange}
              />
              <span className="errorText">{formErrors.password}</span>

              <button type="submit" onClick={handleSubmit}>
                Login
              </button>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </div>
    </>
  );
};
export default Login;
