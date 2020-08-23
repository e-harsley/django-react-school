import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";
import { Redirect } from "react-router-dom";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    // auth: PropTypes.bool,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const login = { username, password };
    this.props.loginUser(login);
    this.setState({
      password: "",
    });
  };

  render() {
    if (this.props.isAuthenticated == true) {
      // console.log("okk");
      // return <Redirect to="/" />;
      if (this.props.user_type.is_teacher) {
        return <Redirect to="/teacher" />;
      } else if (this.props.user_type.is_student) {
        return <Redirect to="/student" />;
      }
    }
    const { username, password } = this.state;
    return (
      <div className="uk-padding-small">
        <h3 className="uk-text-lead uk-text-bold uk-margin-remove-bottom">
          Log in
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
                value={username}
                onChange={this.onChange}
                name="username"
                placeholder="Input"
                required
                style={{ borderRadius: "10px" }}
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
                value={password}
                onChange={this.onChange}
                name="password"
                className="uk-input"
                required
                placeholder="Password"
                style={{ borderRadius: "10px" }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="uk-button uk-button-small uk-margin-small-top uk-button-primary uk-border-rounded"
          >
            Log in
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToprops = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user_type: state.auth.user,
});

export default connect(mapStateToprops, { loginUser })(Login);
