import React from "react";
import logo from "../../assets/images/logo.png";
import facebookIcon from "../../assets/images/fb.png";
import { AiOutlineGoogle } from "react-icons/ai";
import "./styles/Login.css";
export default function Login(props) {
  const signUp = () => {
    window.location.href = "/";
  };
  return (
    <div className="register-page">
      <div className="header-bar">
        <img src={logo} className="logo-image" alt="" />
      </div>
      <div className="form__sign-up">
        <div className="signIn__title">
          <h1>Sign In</h1>
        </div>
        <input placeholder="Your user name...." className="input__user-name" />
        <input placeholder="Your password...." className="input__password" />
        <div className="btn_sign-in">Sign In</div>

        <div className="remember-area">
          <input
            style={{
              marginTop: "15px",
              marginLeft: "5px",
              marginRight: "5px",
              cursor: "pointer",
            }}
            type="checkbox"
          />
          <p>Remember me</p>
          <p style={{ marginLeft: "17%", cursor: "pointer" }} onClick={signUp}>
            Sign Up Now?
          </p>
        </div>
        <div className="fb-zone">
          <img className="facebook-icon" src={facebookIcon} alt="" />
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
