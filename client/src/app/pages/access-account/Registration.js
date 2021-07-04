import React from "react";
import axios from "axios";
import background from "../../assets/images/background.jpg";
import logo from "../../assets/images/logo.png";
import facebookIcon from "../../assets/images/fb.png";
import { AiOutlineGoogle } from "react-icons/ai";

import "./styles/Registration.css";
export default function Registration() {
  return (
    <div className="register-page">
      <div className="header-bar">
        <img src={logo} className="logo-image" />
        <div className="btn__sign-in">Sign In</div>
      </div>
      <div className="form__sign-up">
        <h2>Sign Up</h2>
        <input placeholder="Your user name...." className="input__user-name" />
        <input placeholder="Your password...." className="input__password" />
        <div className="btn_sign-up">Sign Up</div>
        <div className="fb-zone">
          <img className="facebook-icon" src={facebookIcon} />
          <span style={{ marginLeft: "10px", marginTop: "5px" }}>
            Sign Up with Facebook
          </span>
        </div>
        <div className="google-zone">
          <AiOutlineGoogle className="google-icon" />
          <span style={{ marginLeft: "10px", marginTop: "5px" }}>
            Sign Up with Google
          </span>
        </div>
      </div>
    </div>
  );
}
