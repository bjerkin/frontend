import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo.png";
import login_background from "../image/login_background.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //Function to validate user information from DB
  const validateUser = (email, password) => {
    const defaultUser = { email: "admin@admin.com", password: "admin" };

    if (email === defaultUser.email && password === defaultUser.password) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    console.log(email, password);

    let userIsValid = validateUser(email, password);

    if (userIsValid) {
      navigate("/home");
    } else {
      alert("Login Failed");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <section className="section-login">
      <img src={login_background} alt="login_background" className="login__background-image"/>
      <header>
        <div className="header__logo-box">
          <img src={logo} alt="logo" className="header__logo" />
        </div>
      </header>
      <div className="login">
        <div className="login__form">
          <form onSubmit={handleSubmit} className="form">
            <div className="u-margin-bottom-medium">
              <h2 className="heading-secondary">Welcome</h2>
            </div>
            <div className="form__group">
              <input
                type="email"
                className="form__input"
                placeholder="Your Mail"
                id="email"
                required="required"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email" className="form__label">
                Your Mail
              </label>
            </div>
            <div className="form__group">
              <input
                type="password"
                className="form__input"
                placeholder="Password"
                id="password"
                required="required"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className="form__label">
                Password
              </label>
            </div>
            <div className="form__group">
              <a className="form__link" href="www.google.com">
                Forget Password?
              </a>
            </div>

            <div className="form__group">
              <button className="btn btn--blue" type="submit">Login</button>
            </div>
            <div className="form__group">
              <a className="form__link form__link-register" href="www.google.com">
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );

  /*   return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div>
        <input
          id="email"
          className="text-input"
          type="email"
          placeholder="Your mail"
          required="required"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <input
          id="password"
          className="text-input"
          type="password"
          placeholder="Password"
          required="required"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <input className="btn" type="submit" value="Login" />
        <br></br>
        <button className="btn">Register</button>
      </div>
    </form>
  ); */
};

export default Login;
