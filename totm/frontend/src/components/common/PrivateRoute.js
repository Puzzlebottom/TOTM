import React from "react";
import { Route, Redirect, Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//check if this is loading props properly

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  if (auth.isLoading) {
    return <h2>Loading...</h2>;
  } else if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  } else return <Outlet {...rest} />;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
