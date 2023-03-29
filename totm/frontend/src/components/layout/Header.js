import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { setActiveNavlink } from "../../actions/navlinks";
import { selectAgent } from "../../actions/agents";
import { selectCluster } from "../../actions/clusters";

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      turn: 1,
      zeroTime: new Date().getTime(),
      time: new Date().getTime(),
    };

    this.handleClick = this.handleClick.bind(this);
    this.incrementTimer = this.incrementTimer.bind(this);
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    setActiveNavlink: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.incrementTimer(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  incrementTimer() {
    if (this.state.turn != this.props.selectedEncounter.turn) {
      this.setState({
        zeroTime: new Date().getTime(),
        turn: this.props.selectedEncounter.turn,
      });
    }
    this.setState({
      time: new Date().getTime(),
    });
  }

  formatTimer() {
    const count = Math.floor((this.state.time - this.state.zeroTime) / 1000);
    const minutes = Math.floor((count % (60 * 60)) / 60);
    const seconds = Math.ceil(count % 60);
    const secondsFormatted = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + secondsFormatted;
  }

  handleClick = (e) => {
    const link = e.target.getAttribute("value");
    this.props.setActiveNavlink(link);
    this.props.selectAgent(null);
    this.props.selectCluster(null);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const navlinks = [
      { title: "Characters", type: "character" },
      { title: "NPCs", type: "npc" },
      { title: "Monsters", type: "monster" },
      { title: "Events", type: "event" },
    ];

    const authLinks = (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <button
            onClick={this.props.logout}
            className="nav-link btn btn-primary btn-sm text-light"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    const inGame = (
      <Fragment>
        <Link to="/encounter" className="col">
          <button className="btn btn-dark position-relative p-1">
            <img
              src={"static/frontend/icons/gear.svg"}
              className="menu-icon"
              style={{ color: "white" }}
              height="30px"
              width="30px"
            />
          </button>
        </Link>
        <h6 className="col-auto m-0 text-light">
          <div className="row m-0 p-0">
            ROUND {this.props.selectedEncounter.round} TURN{" "}
            {this.props.selectedEncounter.turn}
          </div>
          <div className="row m-0 p-0">{this.formatTimer()}</div>
        </h6>
      </Fragment>
    );

    const navigation = (
      <Fragment>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {navlinks.map((link) => {
              return (
                <li key={link.type} className="nav-item">
                  <Link
                    to="/manager"
                    className={
                      this.props.activeLink == link.type
                        ? "nav-link active"
                        : "nav-link"
                    }
                    value={link.type}
                    onClick={this.handleClick}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </Fragment>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark">
        <div className="container-fluid justify-content-start">
          <Link
            to="/"
            className="navbar-brand col-auto"
            value={""}
            onClick={this.handleClick}
          >
            TOTM
          </Link>
          {this.props.inGame ? inGame : navigation}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  activeLink: state.navlinks.activeLink,
  inGame: state.messages.inGame,
  selectedEncounter: state.encounters.selectedEncounter,
  zeroTime: state.encounters.zeroTime,
});

export default connect(mapStateToProps, {
  logout,
  setActiveNavlink,
  selectAgent,
  selectCluster,
})(Header);
