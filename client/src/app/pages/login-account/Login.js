import React from "react";
import axios from "axios";
import background from "../../assets/images/background.jpg";
import logo from "../../assets/images/logo.png";
import facebookIcon from "../../assets/images/fb.png";
import { AiOutlineGoogle } from "react-icons/ai";

import "./style/Login.css";
export default function Login() {
  return (
    <div className="register-page">
      <div className="header-bar">
        <img src={logo} className="logo-image" />
      </div>
      <div className="form__sign-up">
        <div className="signIn__title"><h1>Sign In</h1></div>
        <input placeholder="Your user name...." className="input__user-name" />
        <input placeholder="Your password...." className="input__password" />
        <div className="btn_sign-in">Sign In</div>
        
        <div className="remember-check-area">
          <div>
            <input type="checkbox"/>
            <label>Remember me</label>
          </div>
          <div>
            <a href="help" className="need-support">Need Support?</a>
          </div>
        </div>
        <div className="fb-zone">
          <img className="facebook-icon" src={facebookIcon} />
          <span style={{ marginLeft: "10px", marginTop: "5px" }}>
            Sign In with Facebook
          </span>
        </div>
        <div className="google-zone">
          <AiOutlineGoogle className="google-icon" />
          <span style={{ marginLeft: "10px", marginTop: "5px" }}>
            Sign In with Google
          </span>
        </div>
      </div>
    </div>
  );
}
