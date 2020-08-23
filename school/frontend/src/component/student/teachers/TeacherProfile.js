import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeachers } from "../../../actions/teacher";
import AvatarGenerator from "react-avatar-generator";
import { Link } from "react-router-dom";

export class TeacherProfile extends Component {
  componentDidMount() {
    let id = this.props.match.params.interest_id;
    console.log(this.props.getTeachers(id));
  }
  render() {
    if (this.props.teacher === undefined) {
      return (
        <div
          className="uk-margin-large"
          data-uk-spinner="ratio: 3"
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        ></div>
      );
    } else {
      return (
        <div>
          <div className="uk-grid-small uk-margin-small-left" data-uk-grid>
            <div className="uk-width-1-4@s uk-width-1-3">
              <AvatarGenerator
                sizing="9"
                colors={["#1c3f6e", "#2e67a0", "blue"]}
                height="150"
                width="150"
                shape="circle"
                backgroundColor="#eee"
              />
            </div>
            <div className="uk-width-3-4@s uk-width-2-3 uk-padding-small-left">
              <div className="uk-width-1-2">
                <h1
                  className="uk-text-lead uk-text-large uk-text-emphasis"
                  style={{ fontSize: "2.6rem", margin: "0" }}
                >
                  {this.props.teacher.user.username}
                </h1>
                <h1
                  className="uk-text-meta"
                  style={{
                    fontSize: "1.5rem",
                    margin: "0",
                    paddingBottom: "5px",
                  }}
                >
                  {this.props.teacher.user.first_name}{" "}
                  {this.props.teacher.user.last_name}
                </h1>
                <h1
                  className="uk-text-meta"
                  style={{
                    fontSize: "1.2rem",
                    margin: "0",
                    paddingBottom: "5px",
                  }}
                >
                  {this.props.teacher.interests.name}
                </h1>
                <h1
                  className="uk-text-emphasis"
                  style={{
                    fontSize: "1.2rem",
                    lineHeight: "1.5",
                    margin: "0",
                    paddingBottom: "5px",
                  }}
                >
                  <span className="uk-text-primary">
                    {this.props.teacher.user.location}
                  </span>
                </h1>
                <h1
                  className="uk-text-meta"
                  style={{
                    fontSize: "1.2rem",
                    lineHeight: "1.5",
                    margin: "0",
                    paddingBottom: "5px",
                  }}
                >
                  {this.props.teacher.user.bio}
                </h1>
              </div>
            </div>
          </div>
          <div>
            <hr style={{ margin: "20px 0 10px 0" }} />
            <div>
              <h1
                className="uk-text-lead"
                style={{ fontSize: "2rem", margin: "0 0 10px 0" }}
              >
                {this.props.teacher.user.username} Courses
              </h1>
            </div>

            <hr />
            {this.props.teacher.course.length > 0 ? (
              <table className="uk-table uk-table-striped">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Course</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.teacher.course.map((course) => (
                    <tr key={course.id}>
                      <td>
                        <span className="uk-badge">
                          {this.props.teacher.interests.name}
                        </span>
                      </td>
                      <td>{course.title}</td>
                      <td>
                        <Link
                          to={`/student/subject/${this.props.teacher.interests.id}/${this.props.teacher.user.username}/${this.props.teacher.user.id}/${course.id}`}
                          className="uk-button uk-button-primary uk-button-small uk-border-rounded"
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
                <li>This user currently does not have any course yet</li>
              </ul>
            )}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  if (state.teacher.teachers.length > 0) {
    return {
      teacher: state.teacher.teachers.find((teacher) => teacher.user.id == id),
    };
  } else {
    return {
      teacher: state.teacher.teachers.find((teacher) => teacher.user.id == id),
    };
  }
};

export default connect(mapStateToProps, { getTeachers })(TeacherProfile);
