import React, { Component } from "react";
import { connect } from "react-redux";
import { addCourse } from "../../../actions/course";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      overview: "",
      desc: "",
    };
  }

  static propTypes = {
    addCourse: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { title, overview } = this.state;
    const course = { title, overview };
    this.props.addCourse(course);
    this.setState({
      title: "",
      overview: "",
      desc: "Add more topics or click nevermind to go back",
    });
  };

  render() {
    const { title, overview, desc } = this.state;

    return (
      <div>
        {desc == "" ? (
          <h1 className="uk-text-lead">Use the form below to add Topics</h1>
        ) : (
          <h1 className="uk-text-lead">{desc}</h1>
        )}
        <form
          className="uk-form uk-form-stacked uk-width-2-3@s uk-width-1-1"
          onSubmit={this.onSubmit}
        >
          <div className="uk-margin">
            <label className="uk-form-label" style={{ fontSize: " 1.2rem" }}>
              Name
            </label>
            <div className="uk-form-controls">
              <input
                required
                className="uk-input uk-border-rounded"
                name="location"
                type="text"
                name="title"
                value={title}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label" style={{ fontSize: " 1.2rem" }}>
              Overview
            </label>
            <div className="uk-form-controls">
              <textarea
                required
                className="uk-textarea uk-border-rounded"
                name="bio"
                rows="5"
                name="overview"
                value={overview}
                onChange={this.onChange}
              />
            </div>
          </div>
          <button className="uk-button uk-button-secondary uk-button-small uk-text-capitalize uk-border-rounded uk-margin-right">
            Add courses
          </button>
          <Link
            to="/teacher"
            className="uk-button uk-button-default uk-button-small uk-text-capitalize uk-border-rounded"
          >
            Nevermind
          </Link>
        </form>
      </div>
    );
  }
}

export default connect(null, { addCourse })(AddCourse);
