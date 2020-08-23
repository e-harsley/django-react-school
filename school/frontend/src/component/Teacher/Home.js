import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCourses, deleteCourse } from "../../actions/course";
import PropTypes from "prop-types";

export class Home extends Component {
  static propTypes = {
    getCourses: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    deleteCourse: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getCourses();
  }

  render() {
    return (
      <div>
        <div>
          <div className="uk-flex uk-flex-between uk-flex-middle">
            <h1
              className="uk-text-lead"
              style={{ fontSize: "2rem", margin: "0 0 10px 0" }}
            >
              My Topics
            </h1>
            <Link
              to="/teacher/add/course"
              className="uk-button uk-button-secondary uk-button-small uk-text-capitalize uk-border-rounded"
            >
              Add Topics
            </Link>
          </div>

          <hr />
          {this.props.courses.length > 0 ? (
            <table className="uk-table uk-table-striped">
              <thead>
                <tr>
                  <th>Course</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.props.courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.title}</td>
                    <td>
                      <Link
                        to={`${this.props.match.path}/course/detail/${course.id}`}
                        className="uk-button uk-button-primary uk-button-small uk-text-capitalize uk-border-rounded"
                      >
                        View courses
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={this.props.deleteCourse.bind(this, course.id)}
                        className="uk-button uk-button-danger uk-button-small uk-text-capitalize uk-border-rounded"
                      >
                        Delete Course
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <ul className="uk-list uk-list-striped">
              <li>
                You haven't created any topics yet. click the create topics to
                add
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  courses: state.course.courses,
});

export default connect(mapStateToProps, { deleteCourse, getCourses })(Home);
