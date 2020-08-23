import React, { Component, Fragment } from "react";
import learning from "../../assets/online-learning.svg";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import visitor from "./visitor";
import Anonymous from "../common/Anonymous";
import PrivateRoute from "../common/PrivateRoute";
import StudentRoute from "../common/StudentRoute";
import TeacherRoute from "../common/TeacherRoute";
import Teacher from "../Teacher/Teacher";
import Student from "../student/Student";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Alert from "../layout/Alert";
import EditRoute from "../common/EditRoute";
import Edit from "./Edit";
import Profile from "./Profile";
import NotFound from "./NotFound";

export class Base extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="uk-section uk-margin-remove uk-padding-remove">
            <div
              className="uk-container uk-container-small uk-padding-small"
              style={{ marginTop: "20px" }}
            >
              <Fragment>
                <Header />
                <div style={{ marginTop: "15px" }}>
                  <Switch>
                    <PrivateRoute exact path="/" />
                    <Route path="/create-account" component={visitor} />
                    <TeacherRoute path="/teacher" component={Teacher} />
                    <StudentRoute path="/student" component={Student} />
                    <Route path="/404" component={NotFound} status={404} />
                  </Switch>
                </div>
                <Footer />
              </Fragment>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default Base;
