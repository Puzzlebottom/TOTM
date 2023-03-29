import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { updateAgent } from "../../actions/agents";
import { runEncounter } from "../../actions/encounters";

export class InitiativeRoller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initiatives: [],
    };

    this.d20 = this.d20.bind(this);
    this.rollInitiative = this.rollInitiative.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getInitIndex = this.getInitIndex.bind(this);
    this.allAgentsHaveInitiative = this.allAgentsHaveInitiative.bind(this);
    this.allPlayersHaveInitiative = this.allPlayersHaveInitiative.bind(this);
  }

  static propTypes = {
    encounterAgents: PropTypes.array.isRequired,
    updateAgent: PropTypes.func.isRequired,
  };

  d20() {
    return Math.floor(Math.random() * 20) + 1;
  }

  allAgentsHaveInitiative() {
    const noInit = this.props.encounterAgents.filter(
      (agent) => agent.initiative == null
    );
    return this.props.encounterAgents.length > 0 && noInit.length == 0;
  }

  allPlayersHaveInitiative() {
    const noInit = this.props.encounterAgents.filter(
      (agent) => agent.type == "character" && agent.initiative == null
    );
    return this.props.encounterAgents.length > 0 && noInit.length == 0;
  }

  rollInitiative(e) {
    e.preventDefault();
    this.state.initiatives.map((init) => {
      this.props.updateAgent(init.id, {
        initiative: init.init + (init.bonus || 0),
      });
    });
    const nonPlayerAgents = this.props.encounterAgents.filter(
      (agent) => agent.type != "character" && agent.initiative == null
    );

    const filteredByUniqueName = nonPlayerAgents.filter(
      (agent, index, array) =>
        array.findIndex((a) => a.name === agent.name) === index
    );

    filteredByUniqueName.map((agent) => {
      const groupRoll = this.d20();
      const groupName = agent.name;
      nonPlayerAgents
        .filter((agent) => agent.name == groupName)
        .map((agent) => {
          const initiative = groupRoll + agent.initiative_bonus;
          this.props.updateAgent(agent.id, {
            initiative: initiative,
          });
        });
    });
  }

  handleChange(e) {
    const id = parseInt(e.target.id);
    const init = parseInt(e.target.value);
    const bonus = parseInt(e.target.nextElementSibling.value);
    const index = this.getInitIndex(id);
    if (init < 1 || init > 20) {
      return;
    } else {
      const initObject = { id: id, init: init, bonus: bonus };
      const initiatives = this.state.initiatives;
      if (index == -1) {
        initiatives.push(initObject) - 1;
      } else if (init !== init) {
        initiatives.splice(index, 1);
      } else {
        initiatives.splice(index, 1, initObject);
      }
      this.setState({ initiatives: [...initiatives] });
    }
  }

  getInitIndex(id) {
    return this.state.initiatives.findIndex((init) => parseInt(init.id) == id);
  }

  render() {
    const agents = this.props.encounterAgents;

    const openModal = (
      <button
        data-bs-toggle="modal"
        data-bs-target="#initiative-modal"
        className="btn btn-primary col-3 shadow"
      >
        ROLL INITIATIVE
      </button>
    );

    const roll = (
      <button
        className="btn btn-primary col-3 shadow py-1"
        onClick={this.rollInitiative}
      >
        ROLL INITIATIVE
      </button>
    );

    const run = (
      <Link
        to="/tracker"
        className="btn btn-primary col-3 shadow"
        onClick={() => this.props.runEncounter(this.props.selectedEncounter.id)}
      >
        RUN ENCOUNTER
      </Link>
    );

    return (
      <Fragment>
        {this.allAgentsHaveInitiative()
          ? run
          : this.allPlayersHaveInitiative()
          ? roll
          : openModal}
        <div id="roll-initiative">
          <div id="initiative-modal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header justify-content-center">
                  <h4>PLAYER INITIATIVES</h4>
                </div>
                <div className="modal-body">
                  <form className="form-control" onSubmit={this.rollInitiative}>
                    {agents
                      .filter(
                        (agent) =>
                          agent.type == "character" && agent.initiative == null
                      )
                      .map((agent, i) => {
                        return (
                          <div
                            key={`agent${i + 1}`}
                            id={agent.id}
                            className="row align-items-center mb-2"
                          >
                            <div className="col-6 offset-md-2 text-start">
                              {agent.name}
                            </div>
                            <input
                              className="col-1 offset-md-9 mx-0 px-0 text-center"
                              type="number"
                              min="1"
                              max="20"
                              name="roll"
                              placeholder="roll"
                              required={true}
                              id={agent.id}
                              value={
                                this.getInitIndex(agent.id) >= 0
                                  ? this.state.initiatives[
                                      this.getInitIndex(agent.id)
                                    ].init
                                  : ""
                              }
                              onChange={this.handleChange}
                            />
                            <input
                              type="hidden"
                              name="bonus"
                              value={agent.initiative_bonus}
                            />
                            <div className="col-1 mx-0 px-0">
                              + {agent.initiative_bonus}
                            </div>
                          </div>
                        );
                      })}
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#initiative-modal"
                    >
                      CONFIRM
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  encounterAgents: state.encounters.encounterAgents,
  selectedEncounter: state.encounters.selectedEncounter,
});

export default connect(mapStateToProps, { updateAgent, runEncounter })(
  InitiativeRoller
);
