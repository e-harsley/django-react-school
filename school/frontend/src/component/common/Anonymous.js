import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Anonymous = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isAuthenticated) {
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

export default connect(mapStateToProps)(Anonymous);
