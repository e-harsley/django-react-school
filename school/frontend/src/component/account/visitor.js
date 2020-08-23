import React, { Component } from "react";
import learning from "../../assets/online-learning.svg";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import SForm from "./SForm";
import TForm from "./TForm";
import PrivateRoute from "../common/PrivateRoute";
import Anonymous from "../common/Anonymous";

export class visitor extends Component {
  render() {
    return (
      <div>
        <div
          className="uk-margin-remove uk-background-default uk-border-rounded uk-padding-remove"
          data-uk-grid
          style={{ marginLeft: "0px" }}
        >
          <div className="uk-padding-small uk-width-2-3@s uk-width-1-1">
            <Switch>
              <Anonymous
                exact
                path={`${this.props.match.path}`}
                component={Home}
              />
              <Route exact path={`/create-account/login`} component={Login} />
              <Route
                exact
                path={`/create-account/account/signup`}
                component={Signup}
              />
              <Route
                exact
                path={`/create-account/accounts/signup/student`}
                component={SForm}
              />
              <Route
                exact
                path={`/create-account/accounts/signup/teacher`}
                component={TForm}
              />
            </Switch>
          </div>
          <div className="uk-width-1-3 uk-padding-small uk-visible@s">
            <img style={{ width: "100%", height: "100%" }} src={learning} />
          </div>
        </div>
      </div>
    );
  }
}

export default visitor;
