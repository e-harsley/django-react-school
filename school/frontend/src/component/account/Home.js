import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Home extends Component {
  render() {
    return (
      <div>
        <h2>
          Welcome to the Django Schools!{" "}
          <span data-uk-icon="icon:happy; ratio:2"></span>
        </h2>
        <p
          className="uk-text-lead uk-text-light"
          style={{ fontSize: "1.3rem" }}
        >
          If you already have an account, go ahead and{" "}
          <Link to="/create-account/login">log in</Link>. If you are new to
          Django Schools, get started by creating a{" "}
          <Link to="/create-account/accounts/signup/student">
            student account
          </Link>{" "}
          or a{" "}
          <Link to="/create-account/accounts/signup/teacher">
            teacher account
          </Link>
          .
        </p>
        <hr />
        <p className="uk-text-normal" style={{ fontSize: "1.3rem" }}>
          This Django application is an example I created to illustrate a. In
          this application, users can sign up as a student or a teacher.
          Teachers can create topics, add modules to the topics and students can
          see the courses based on there interests
        </p>
      </div>
    );
  }
}

export default Home;
