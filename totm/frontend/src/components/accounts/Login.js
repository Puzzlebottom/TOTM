import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { login } from "../../actions/auth";

export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }

    const { username, password } = this.state;

    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body my-5">
          <h2 className="text-center">Login</h2>
          <form onSubmit={this.onSubmit}>
            <div className="input-group mb-2">
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
            <div className="input-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="row m-2 text-center">
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <p>
                Don't have an account? <Link to="/register">Register</Link>
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

export default connect(mapStateToProps, { login })(Login);
