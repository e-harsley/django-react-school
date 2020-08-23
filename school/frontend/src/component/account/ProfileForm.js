import React, { Component } from "react";
import { connect } from "react-redux";
import { editProfile } from "../../actions/auth";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

export class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: props.user.first_name,
      last_name: props.user.last_name,
      email: props.user.email,
      location: props.user.location,
      bio: props.user.bio,
    };
  }

  static propTypes = {
    editProfile: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name, email, location, bio } = this.state;
    const profile = { first_name, last_name, email, location, bio };
    this.props.editProfile(profile);
  };

  render() {
    const { first_name, last_name, email, location, bio } = this.state;
    return (
      <div>
        <div className="uk-width-1-1">
          <h1
            className="uk-heading-bullet uk-text-lead uk-text-capitalize"
            style={{ fontSize: "1.5rem", margin: "0" }}
          >
            Edit Your Profile
          </h1>
          <p
            className="uk-text-center uk-text-meta"
            style={{ fontSize: "1.5rem", margin: "0" }}
          >
            You can edit your account using the following form
          </p>
          <form
            onSubmit={this.onSubmit}
            className="uk-form uk-form-stacked uk-width-3-4@s uk-width-1-1 "
          >
            <div className="uk-margin">
              <label className="uk-form-label" style={{ fontSize: " 1.2rem" }}>
                First Name
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input uk-border-rounded"
                  name="first_name"
                  value={first_name}
                  type="text"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" style={{ fontSize: " 1.2rem" }}>
                Last Name
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input uk-border-rounded"
                  name="last_name"
                  value={last_name}
                  type="text"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" style={{ fontSize: " 1.2rem" }}>
                Email
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input uk-border-rounded"
                  name="email"
                  value={email}
                  type="email"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" style={{ fontSize: " 1.2rem" }}>
                Location
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input uk-border-rounded"
                  name="location"
                  value={location}
                  type="text"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" style={{ fontSize: " 1.2rem" }}>
                Bio
              </label>
              <div className="uk-form-controls">
                <textarea
                  className="uk-textarea uk-border-rounded"
                  name="bio"
                  value={bio}
                  rows="8"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <button className="uk-button uk-border-rounded uk-button-small  uk-margin-right uk-button-default">
              Update Profile
            </button>
            <Link
              to="/teacher/profile"
              className="uk-button uk-border-rounded uk-button-small uk-button-secondary"
            >
              Nevermind
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { editProfile })(ProfileForm);
