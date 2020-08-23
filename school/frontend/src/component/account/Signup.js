import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Signup extends Component {
  render() {
    return (
      <div>
        <h2>Sign up for a free account</h2>
        <Link
          to="/create-account/accounts/signup/student"
          className="uk-button uk-margin-small-right uk-border-rounded uk-button-small uk-button-large@s"
          style={{
            color: "#fff",
            backgroundColor: "#608993",
            borderColor: "#608993",
          }}
        >
          I'm a student
        </Link>
        <Link
          to="/create-account/accounts/signup/teacher"
          className="uk-button uk-margin-small-right uk-border-rounded uk-button-small uk-button-large@s"
          style={{
            color: "#fff",
            backgroundColor: "#8980a5",
            borderColor: "#8980a5",
          }}
        >
          I'm a teacher
        </Link>
      </div>
    );
  }
}

export default Signup;
