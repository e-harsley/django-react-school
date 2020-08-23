import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editCourse } from "../../../actions/course";
import parse from "html-react-parser";

export class EditCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      overview: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    let id = this.props.match.params.id;
    const { title, overview } = this.state;
    const course = { title, overview };
    this.props.editCourse(id, course);
  };

  componentDidMount() {
    if (this.props.course !== undefined) {
      this.setState({
        title: this.props.course.title,
        overview: this.props.course.overview,
      });
    }
  }

  componentDidUpdate(nextProps) {
    if (this.props.course !== nextProps.course) {
      this.setState({
        title: this.props.course.title,
        overview: this.props.course.overview,
      });
    }
  }

  static propTypes = {
    editCourse: PropTypes.func,
    modules: PropTypes.array,
  };

  render() {
    if (this.props.course === undefined) {
      return <h1>Loading</h1>;
    } else {
      const { title, overview } = this.state;
      return (
        <div>
          <h1 className="uk-text-lead uk-text-bold">Edit {title}</h1>
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
              Edit courses
            </button>
            <Link
              to={`/teacher/course/detail/${this.props.match.params.id}`}
              className="uk-button uk-button-default uk-button-small uk-text-capitalize uk-border-rounded"
            >
              Back
            </Link>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  if (state.course.courses.length > 0) {
    return {
      course: state.course.courses.find((course) => course.id == id),
    };
  } else {
    return {
      course: state.course.courses.find((course) => course.id == id),
    };
  }
};

export default connect(mapStateToProps, { editCourse })(EditCourse);
