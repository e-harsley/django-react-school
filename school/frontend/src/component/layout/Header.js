import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    if (isAuthenticated) {
      if (user.is_teacher) {
        return (
          <div className="uk-flex uk-margin-small uk-flex-middle uk-flex-between">
            <Link to="/teacher" className="uk-logo uk-margin-remove logo">
              Stem School{" "}
              <span className="uk-text-meta" style={{ fontSize: "1.2rem" }}>
                teacher
              </span>
            </Link>
            <div>
              <button
                onClick={this.props.logout}
                className="uk-button uk-border-rounded uk-button-small uk-button-primary "
              >
                Logout
              </button>
            </div>
          </div>
        );
      } else if (user.is_student) {
        return (
          <div className="uk-flex uk-flex-middle uk-flex-between">
            <Link to="/student" className="uk-logo uk-margin-remove logo">
              Stem School{" "}
              <span className="uk-text-meta" style={{ fontSize: "1.2rem" }}>
                student
              </span>
            </Link>
            <div>
              <button
                onClick={this.props.logout}
                className="uk-button uk-border-rounded uk-button-small uk-button-primary "
              >
                Logout
              </button>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="uk-flex uk-flex-middle uk-flex-between">
          <Link to="/create-account" className="uk-logo uk-margin-remove logo">
            Stem School
          </Link>
          <div>
            <Link
              to="/create-account/login"
              className="uk-button uk-margin-small-right uk-border-rounded uk-button-small uk-background-default"
            >
              Log in
            </Link>
            <Link
              to="/create-account/account/signup"
              className="uk-button uk-border-rounded uk-button-small uk-button-primary "
            >
              Sign up
            </Link>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
