import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const StoreRoute = ({ component: Component, auth, ...rest }) => (
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
      }
      if (auth.isAuthenticated && auth.isStudent) {
        return <Redirect to="/student" />;
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

export default connect(mapStateToProps)(StoreRoute);
