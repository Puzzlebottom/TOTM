import React, { Component, Fragment } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./layout/Header";
import Dashboard from "./encounters/Dashboard";
import Alert from "./layout/Alert";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import AgentManager from "./agents/AgentManager";
import EncounterSetup from "./encounters/EncounterSetup";
import CombatTracker from "./tracker/CombatTracker";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Header />
            <Alert />
            <div className="container">
              <Routes>
                <Route path="/" element={<PrivateRoute />}>
                  <Route path="/" element={<Dashboard />} />
                </Route>
                <Route path="/manager" element={<PrivateRoute />}>
                  <Route path="/manager" element={<AgentManager />} />
                </Route>
                <Route path="/encounter" element={<PrivateRoute />}>
                  <Route path="/encounter" element={<EncounterSetup />} />
                </Route>
                <Route path="/tracker" element={<PrivateRoute />}>
                  <Route path="/tracker" element={<CombatTracker />} />
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
