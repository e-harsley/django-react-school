import React, { Component } from "react";
import AvatarGenerator from "react-avatar-generator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCourses } from "../../actions/course";

export class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    getCourses: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getCourses();
  }
  render() {
    const {
      username,
      first_name,
      last_name,
      location,
      bio,
      date_joined,
    } = this.props.user;
    return (
      <div>
        <div>
          <div className="uk-grid-small" data-uk-grid>
            <div className="uk-width-1-4@s uk-width-1-3">
              <AvatarGenerator
                sizing="9"
                colors={["#1c3f6e", "#2e67a0", "blue"]}
                height="150"
                width="150"
                shape="square"
                backgroundColor="#eee"
              />
            </div>
            <div className="uk-width-3-4@s uk-width-2-3 uk-padding-small-left">
              <div className="uk-width-1-2@s uk-width-1-1">
                <h1
                  className="uk-text-lead uk-text-large uk-text-emphasis"
                  style={{ fontSize: "2.6rem", margin: "0" }}
                >
                  {username}
                </h1>
                <h1
                  className="uk-text-meta"
                  style={{ fontSize: "1.5rem", margin: "0" }}
                >
                  {first_name} {last_name}
                </h1>
                <h1
                  className="uk-text-emphasis"
                  style={{ fontSize: "1.1rem", lineHeight: "1.5", margin: "0" }}
                >
                  <span className="uk-text-primary">{location}</span>
                </h1>
                <h1
                  className="uk-text-meta"
                  style={{ fontSize: "1.1rem", lineHeight: "1.5", margin: "0" }}
                >
                  {bio}
                </h1>
                <div className="uk-margin-small-top">
                  <Link
                    to="/teacher/edit/profile"
                    className="uk-button uk-border-rounded uk-button-small uk-button-default"
                  >
                    <span data-uk-icon="cog"></span> Edit Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <hr style={{ marginBottom: "10px" }} />
          {this.props.courses.length > 0 ? (
            <table className="uk-table uk-table-striped">
              <thead>
                <tr>
                  <th>Course</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.props.courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.title}</td>
                    <td>
                      <Link
                        to={`/teacher/course/detail/${course.id}`}
                        className="uk-button uk-button-primary uk-button-small uk-text-capitalize uk-border-rounded"
                      >
                        View courses
                      </Link>
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
  user: state.auth.user,
  courses: state.course.courses,
});

export default connect(mapStateToProps, { getCourses })(Profile);
