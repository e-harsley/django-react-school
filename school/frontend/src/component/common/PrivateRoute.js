import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={() => {
      if (auth.isLoading) {
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
      } else if (!auth.isAuthenticated) {
        return <Redirect to="/create-account" />;
      } else {
        if (auth.isTeacher) {
          return <Redirect to="/teacher" />;
        } else if (auth.isStudent) {
          return <Redirect to="/student" />;
        }
      }
    }}
  />
);
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
