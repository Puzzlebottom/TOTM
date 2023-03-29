import React, { Component } from "react";
import { connect } from "react-redux";
import { getAgents, deleteAgent, selectAgent } from "../../actions/agents";
import PropTypes from "prop-types";
import Panel from "../layout/Panel";
import SearchBar from "../layout/SearchBar";
import List from "../layout/List";
import Modal from "../layout/Modal";
import AgentForm from "../agents/AgentForm";
import Detail from "../layout/Detail";

export class AgentManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchField: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  static propTypes = {
    agents: PropTypes.array.isRequired,
    selectedAgent: PropTypes.object.isRequired,
    activeLink: PropTypes.string.isRequired,
    getAgents: PropTypes.func.isRequired,
    deleteAgent: PropTypes.func.isRequired,
    selectAgent: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAgents();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSelect = (e) => {
    if (e == null) {
      this.props.selectAgent(null);
    } else {
      e.stopPropagation();
      this.props.selectAgent(parseInt(e.target.getAttribute("value")));
    }
  };

  handleDelete = (e) => {
    e.stopPropagation();
    this.props.deleteAgent(parseInt(e.target.getAttribute("value")));
  };

  render() {
    const { activeLink, agents, selectedAgent } = this.props;

    const isSelected = selectedAgent && Object.keys(selectedAgent).length !== 0;

    const filteredAgents = agents.filter((agent) => {
      return (
        agent.encounter == null &&
        agent.type == activeLink &&
        agent.name.toLowerCase().includes(this.state.searchField.toLowerCase())
      );
    });

    return (
      <div className="rounded-3 mb-3 border shadow-lg">
        <div className="card-header py-3 text-center">
          <h4 className="mb-0">{activeLink.toUpperCase() + " MANAGER"}</h4>
        </div>
        <div className="row card-body text-center">
          <Panel
            header={<SearchBar onChange={this.handleChange} />}
            footer={
              <Modal
                button={"NEW AGENT"}
                onClick={() => this.handleSelect(null)}
                title={"CREATE AGENT"}
                id={"add-agent"}
              >
                <AgentForm update={false} />
              </Modal>
            }
            frameType={"borderScroll"}
            scrollHeight={"52vh"}
          >
            <List
              content={filteredAgents}
              type={"agent"}
              differentiator={"AgentManager"}
              onClick={this.handleSelect}
              onDelete={this.handleDelete}
            />
          </Panel>
          <Panel
            header={<div className="fs-5 m-1">AGENT DETAILS</div>}
            footer={
              <Modal
                button={"EDIT"}
                isDisabled={!isSelected}
                title={"EDIT AGENT"}
                id={"edit-agent"}
              >
                <AgentForm />
              </Modal>
            }
            frameType={"borderScroll"}
            scrollHeight={"50vh"}
          >
            {isSelected ? (
              <Detail
                object={selectedAgent}
                keys={["name", "type", "stats", "saves", "passives", "notes"]}
              />
            ) : (
              <div>Select an agent</div>
            )}
          </Panel>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  agents: state.agents.agents,
  selectedAgent: state.agents.selectedAgent,
  activeLink: state.navlinks.activeLink,
});

export default connect(mapStateToProps, {
  getAgents,
  deleteAgent,
  selectAgent,
})(AgentManager);
