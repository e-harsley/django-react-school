import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const CustomerRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
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
      } else if (auth.isAuthenticated && auth.isTeacher) {
        return <Redirect to="/teacher" />;
      } else if (auth.isAuthenticated == false) {
        return <Redirect to="/" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CustomerRoute);
