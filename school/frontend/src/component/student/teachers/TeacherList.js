import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeachers } from "../../../actions/teacher";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AvatarGenerator from "react-avatar-generator";

export class TeacherList extends Component {
  static propTypes = {
    teachers: PropTypes.array.isRequired,
    getTeachers: PropTypes.func.isRequired,
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    console.log(this.props.getTeachers(id));
  }

  render() {
    return (
      <div>
        <h1
          className="uk-heading-bullet uk-text-lead uk-text-capitalize"
          style={{ marginTop: "10px", fontSize: "1.2rem" }}
        >
          {this.props.match.params.subject} Teachers
        </h1>
        {this.props.teachers.length > 0 ? (
          <div
            className="uk-grid-small uk-border-pill uk-margin-remove uk-child-width-1-2 uk-child-width-1-2@s
           uk-child-width-1-4@m uk-child-width-1-4@l uk-child-width-1-4@xl"
            style={{ padding: "10px 0 10px 0" }}
            data-uk-grid
          >
            {this.props.teachers.map((teacher) => (
              <Link
                key={teacher.user.id}
                style={{ textDecoration: "none" }}
                to={`/student/subject/${teacher.interests.id}/${teacher.user.username}/${teacher.user.id}`}
              >
                <div className="uk-box-shadow-hover-large uk-box-shadow-smalln uk-padding-remove">
                  <AvatarGenerator
                    sizing="9"
                    colors={["#1c3f6e", "#2e67a0", "blue"]}
                    height="100"
                    width="150"
                    shape="square"
                    backgroundColor="#eee"
                  />
                  <h1
                    className="uk-text-lead uk-text-center"
                    style={{
                      padding: "10px 0 2px 0",
                      margin: "0",
                      fontSize: "1.2rem",
                    }}
                  >
                    {teacher.user.username}
                  </h1>
                  <h1
                    className="uk-text-meta uk-text-center"
                    style={{
                      padding: "0 0 10px 0",
                      margin: "0",
                      fontSize: "1rem",
                    }}
                  >
                    {teacher.interests.name}
                  </h1>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <h5 style={{ lineHeight: "1.5", fontSize: "1.1rem", margin: "0" }}>
            Currently there are no teachers for this subject
          </h5>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  teachers: state.teacher.teachers,
});

export default connect(mapStateToProps, { getTeachers })(TeacherList);
