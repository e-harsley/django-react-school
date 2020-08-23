import React, { Component } from "react";
import AvatarGenerator from "react-avatar-generator";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import Home from "./Home";
import Profile from "../account/Profile";
import Edit from "../account/Edit";
import StudentRoute from "../common/StudentRoute";
import { connect } from "react-redux";
import { getSubjects } from "../../actions/teacher";
import PropTypes from "prop-types";
import TeacherList from "./teachers/TeacherList";
import TeacherProfile from "./teachers/TeacherProfile";
import TeacherModule from "./teachers/TeacherModule";
import NotFound from "../account/NotFound";

export class Student extends Component {
  constructor(props) {
    super(props);
    this.avatarGenerator = null;
  }

  static propTypes = {
    subjects: PropTypes.array.isRequired,
    getSubjects: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getSubjects();
  }

  render() {
    return (
      <div>
        <div
          className="uk-background-default uk-border-rounded"
          style={{ marginLeft: "0px", padding: "15px 15px" }}
        >
          <ul
            className="uk-breadcrumb uk-border-rounded uk-flex-between"
            style={{ backgroundColor: "#e9ecef", padding: "10px 10px" }}
          >
            <li>
              <Link to="/student">
                <span style={{ fontSize: " 1.2rem" }}>Home</span>{" "}
              </Link>
            </li>
            <li>
              <span
                style={{
                  fontSize: " 1.2rem",
                  color: "#5643fa",
                }}
              >
                Welcome, {this.props.username}
              </span>
            </li>
          </ul>
          <Switch>
            <StudentRoute exact path={this.props.match.path} component={Home} />
            <StudentRoute
              exact
              path={`/student/subject/teachers/:id/:subject/`}
              component={TeacherList}
            />
            <StudentRoute
              exact
              path={`/student/subject/:interest_id/:username/:id/`}
              component={TeacherProfile}
            />
            <StudentRoute
              exact
              path={`/student/subject/:interest_id/:username/:id/:course_id`}
              component={TeacherModule}
            />
            <StudentRoute path="/404" component={NotFound} status={404} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  subjects: state.teacher.subjects,
  username: state.auth.user.username,
});

export default connect(mapStateToProps, { getSubjects })(Student);
