import React, { Component } from "react";
import { connect } from "react-redux";
import { teacherRegister } from "../../actions/auth";
import PropTypes from "prop-types";
import { createMessage } from "../../actions/error";
import { Redirect } from "react-router-dom";

export class TForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
      subject: "",
      subjectOption: [
        { id: 1, name: "Mathematics" },
        { id: 2, name: "Biology" },
        { id: 3, name: "Physics" },
        { id: 4, name: "History" },
      ],
    };
  }

  static propTypes = {
    teacherRegister: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubject = (e) => {
    this.setState({
      subject: parseInt(e.target.value),
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password, password2, subject } = this.state;
    if (password2 !== password) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } else {
      const newTeacher = { username, password, subject };
      this.props.teacherRegister(newTeacher);
      this.setState({
        password: "",
        password2: "",
      });
    }
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    if (this.props.isAuthenticated == true) {
      if (this.props.user_type.is_teacher) {
        return <Redirect to="/teacher" />;
      } else if (this.props.user_type.is_student) {
        return <Redirect to="/student" />;
      }
    }
    const {
      username,
      password,
      password2,
      subject,
      subjectOption,
    } = this.state;
    return (
      <div className="uk-padding-small">
        <h3 className="uk-text-lead uk-text-bold uk-margin-remove-bottom">
          Sign up as a teacher.
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
                onChange={this.onChange}
                name="username"
                value={username}
                style={{ borderRadius: "5px" }}
                width="100%"
              />
            </div>
          </div>
          <div className="uk-width-5-6@s uk-width-1-1">
            <label className="uk-form-label uk-width-1-1 uk-margin-small-bottom">
              Subject*
            </label>
            <div
              className="uk-inline uk-margin-small-bottom uk-width-1-1"
              style={{ borderRadius: "5px" }}
            >
              <select
                className="uk-select"
                onChange={this.onSubject}
                name="subject"
                value={subject}
              >
                <option>Please Pick a Subject</option>
                {subjectOption.map((e) => {
                  return (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="uk-width-5-6@s uk-width-1-1">
            <label className="uk-form-label uk-width-1-1 uk-margin-small-bottom">
              Password*
            </label>
            <div className="uk-inline uk-margin-small-bottom uk-width-1-1">
              <span className="uk-form-icon" uk-icon="icon:lock"></span>
              <input
                onChange={this.onChange}
                type="password"
                className="uk-input"
                name="password"
                value={password}
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
                onChange={this.onChange}
                type="password"
                className="uk-input"
                name="password2"
                value={password2}
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

export default connect(mapStateToProps, { teacherRegister, createMessage })(
  TForm
);
