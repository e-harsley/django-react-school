import React, { Component } from "react";
import { connect } from "react-redux";
import { studentRegister } from "../../actions/auth";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { createMessage } from "../../actions/error";

export class SForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
    };
  }

  static propTypes = {
    studentRegister: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password, password2 } = this.state;
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } else {
      const newStudent = { username, password };
      this.props.studentRegister(newStudent);
      this.setState({
        password: "",
        password2: "",
      });
    }
  };

  render() {
    if (this.props.isAuthenticated == true) {
      if (this.props.user_type.is_teacher) {
        return <Redirect to="/teacher" />;
      } else if (this.props.user_type.is_student) {
        return <Redirect to="/student" />;
      }
    }
    const { username, password, password2 } = this.state;
    return (
      <div className="uk-padding-small">
        <h3 className="uk-text-lead uk-text-bold uk-margin-remove-bottom">
          Sign up as a student
        </h3>
        <form className="uk-form-horizontal" onSubmit={this.onSubmit}>
          <div className="uk-width-5-6@s uk-width-1-1">
            <label className="uk-form-label uk-margin-small-bottom">
              Username*
            </label>
            <div className="uk-inline uk-margin-small-bottom uk-width-1-1">
              <span className="uk-form-icon" uk-icon="icon:user"></span>
              <input
                type="text"
                className="uk-input"
                placeholder="Input"
                name="username"
                value={username}
                onChange={this.onChange}
                style={{ borderRadius: "5px" }}
                width="100%"
              />
            </div>
          </div>
          <div className="uk-width-5-6@s uk-width-1-1">
            <label className="uk-form-label uk-width-1-1 uk-margin-small-bottom">
              Password*
            </label>
            <div className="uk-inline uk-margin-small-bottom uk-width-1-1">
              <span className="uk-form-icon" uk-icon="icon:lock"></span>
              <input
                type="password"
                className="uk-input"
                name="password"
                value={password}
                onChange={this.onChange}
                placeholder="Password"
                style={{ borderRadius: "5px" }}
              />
            </div>
          </div>
          <div className="uk-width-5-6@s uk-width-1-1">
            <label className="uk-form-label uk-width-1-1 uk-margin-small-bottom">
              Password*
            </label>
            <div className="uk-inline uk-margin-small-bottom uk-width-1-1">
              <span className="uk-form-icon" uk-icon="icon:lock"></span>
              <input
                type="password"
                name="password2"
                value={password2}
                onChange={this.onChange}
                className="uk-input"
                placeholder="Password"
                style={{ borderRadius: "5px" }}
              />
            </div>
          </div>

          <button className="uk-button uk-button-small uk-margin-small-top uk-button-primary uk-border-rounded">
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user_type: state.auth.user,
});

export default connect(mapStateToProps, { studentRegister, createMessage })(
  SForm
);
