import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

export class Register extends Component {
  state = {
    username: "",
    password: "",
    password2: "",
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password, password2 } = this.state;
    if (password != password2) {
      this.props.createMessage({
        passwordNotMatch: "Passwords do not match",
      });
    } else {
      this.props.register(this.state.username, this.state.password);
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }

    const { username, password, password2 } = this.state;

    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body my-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
                onChange={this.onChange}
                value={username}
                autoComplete="false"
                autoFocus
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                className="form-control"
                placeholder="Re-type Password"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div className="row m-2 text-center">
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);
