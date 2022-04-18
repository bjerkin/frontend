import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import login_background from "../images/login_background.png";
import { UserContext } from "./UserContext";
import axios from "axios";
import { API_URL } from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  //Function to validate user information from DB
  const login = async (email, password) => {

    try {
      const { data: user } = await axios.post(`${API_URL}users/login`, {
        email: email,
        password: password,
      });
      
      setUser(user);
      navigate("/home");
    } catch (error) {
      alert(error.response.data);
    }

  };

  const handleSubmit = (e) => {
    //console.log(email, password);
    e.preventDefault();

    login(email, password);

    setEmail("");
    setPassword("");
  };

  return (
    <section className="section-login">
      <img src={login_background} alt="login_background" className="login__background-image" />
      <header>
        <div className="login__logo-box">
          <img src={logo} alt="logo" className="login__logo" />
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
              <button className="btn btn--blue btn--login" type="submit">
                Login
              </button>
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
};

export default Login;
