import React, { Component } from "react";
import { connect } from "react-redux";
import { getAgents } from "../../actions/agents";
import { importAgent } from "../../actions/encounters";
import Modal from "../layout/Modal";
import Panel from "../layout/Panel";
import SelectBar from "../layout/SelectBar";
import SearchBar from "../layout/SearchBar";
import List from "../layout/List";

export class AgentImport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectField: "select",
      searchField: "",
      candidates: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.addCandidate = this.addCandidate.bind(this);
    this.removeCandidate = this.removeCandidate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAgents();
  }

  addCandidate = (e) => {
    let agentId = parseInt(e.currentTarget.getAttribute("value"));
    let agent = this.props.agents.filter((agent) => agent.id == agentId)[0];
    this.setState({ candidates: [...this.state.candidates, agent] });
  };

  removeCandidate = (e) => {
    let agentId = parseInt(e.currentTarget.getAttribute("value"));
    const index = this.state.candidates.findIndex(
      (candidate) => candidate.id == agentId
    );
    const candidates = [...this.state.candidates];
    candidates.splice(index, 1);
    this.setState({ candidates: [...candidates] });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const id = this.props.selectedEncounter.id;
    const { candidates } = this.state;
    candidates.map((agent) => this.props.importAgent(agent, id));
    this.setState({ candidates: [], selectField: "select", searchField: "" });
  };

  render() {
    const { agents } = this.props;
    const { candidates, selectField, searchField } = this.state;

    const filteredAgents =
      selectField == "all" || selectField == "select"
        ? agents.filter((agent) => {
            return (
              agent.encounter == null &&
              agent.name.toLowerCase().includes(searchField.toLowerCase())
            );
          })
        : agents.filter((agent) => {
            return (
              agent.encounter == null &&
              agent.type == selectField &&
              agent.name.toLowerCase().includes(searchField.toLowerCase())
            );
          });

    const getHeader = () => {
      const options = ["all", "character", "npc", "monster", "event"];
      return (
        <div>
          <SelectBar
            options={options}
            fieldState={selectField}
            onChange={this.handleChange}
          />
          <SearchBar onChange={this.handleChange} />
        </div>
      );
    };

    return (
      <Modal button={"IMPORT AGENTS"} title={"IMPORT AGENTS"} id={"agents"}>
        <Panel
          header={getHeader()}
          frameType={"borderScroll"}
          scrollHeight={"55vh"}
        >
          <List
            content={filteredAgents}
            type={"agent"}
            differentiator={"AgentImport"}
            onClick={this.addCandidate}
          />
        </Panel>
        <Panel
          header={<div>IMPORT TO ENCOUNTER</div>}
          footer={
            <button
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={this.handleSubmit}
            >
              IMPORT
            </button>
          }
          frameType={"scroll"}
          scrollHeight={"58vh"}
        >
          {candidates.length > 0 ? (
            <List
              content={candidates}
              type={"agent"}
              differentiator={"AgentImport"}
              onClick={this.removeCandidate}
              doesStack={true}
            />
          ) : (
            <></>
          )}
        </Panel>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  agents: state.agents.agents,
  encounters: state.encounters.encounters,
  selectedEncounter: state.encounters.selectedEncounter,
});

export default connect(mapStateToProps, { getAgents, importAgent })(
  AgentImport
);
