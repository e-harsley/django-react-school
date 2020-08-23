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
import TeacherRoute from "../common/TeacherRoute";
import AddCourse from "./course/AddCourse";
import CModule from "./course/CModule";
import { getCourses } from "../../actions/course";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddModule from "./course/AddModule";
import EditCourse from "./course/EditCourse";

export class Teacher extends Component {
  static propTypes = {
    getCourses: PropTypes.func.isRequired,
    // courses: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.getCourses();
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
              <Link to="/teacher">
                <span style={{ fontSize: " 1.2rem" }}>Home</span>{" "}
              </Link>
            </li>
            <li>
              <Link to="/teacher/profile">
                <span
                  style={{
                    fontSize: " 1.2rem",
                    color: "#5643fa",
                  }}
                >
                  Welcome, {this.props.username}
                </span>
              </Link>
            </li>
          </ul>
          <Switch>
            <TeacherRoute
              exact
              path={`${this.props.match.path}`}
              component={Home}
            />
            <TeacherRoute
              exact
              path={`/teacher/add/course`}
              component={AddCourse}
            />
            <TeacherRoute
              exact
              path={`/teacher/course/detail/:id`}
              component={CModule}
            />
            <TeacherRoute
              exact
              path={`/teacher/course/detail/:id/module/add`}
              component={AddModule}
            />
            <TeacherRoute
              exact
              path={`/teacher/course/edit/course/:id`}
              component={EditCourse}
            />
            <TeacherRoute exact path={`/teacher/profile`} component={Profile} />
            <TeacherRoute
              exact
              path={`/teacher/edit/profile`}
              component={Edit}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.user.username,
});

export default connect(mapStateToProps, { getCourses })(Teacher);
