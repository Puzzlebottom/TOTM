import React, { Component, Children } from "react";
import { connect } from "react-redux";
import Panel from "../layout/Panel";
import List from "../layout/List";
import AgentForm from "../agents/AgentForm";
import SelectBar from "../layout/SelectBar";
import SearchBar from "../layout/SearchBar";
import { deleteAgent } from "../../actions/agents";
import ClusterToggle from "../agents/ClusterToggle";

export class AgentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectField: "select",
      searchField: "",
    };

    this.onChange = this.onChange.bind(this);
    this.handleDeleteAgent = this.handleDeleteAgent.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDeleteAgent(e) {
    e.stopPropagation();
    this.props.deleteAgent(parseInt(e.target.getAttribute("value")));
  }

  render() {
    const { encounterAgents, selectedAgent } = this.props;

    const filteredAgents =
      this.state.selectField == "all" || this.state.selectField == "select"
        ? encounterAgents.filter((agent) => {
            return agent.name
              .toLowerCase()
              .includes(this.state.searchField.toLowerCase());
          })
        : encounterAgents.filter((agent) => {
            return (
              agent.type == this.state.selectField &&
              agent.name
                .toLowerCase()
                .includes(this.state.searchField.toLowerCase())
            );
          });

    return (
      <Panel
        header={
          <div>
            <div className="mb-1">AGENTS</div>
            <SelectBar
              options={["all", "character", "npc", "monster", "event"]}
              stateName={"selectField"}
              fieldState={this.state.selectField}
              onChange={this.onChange}
            />
            <SearchBar stateName={"searchField"} onChange={this.onChange} />
          </div>
        }
        frameType={"borderScroll"}
        scrollHeight={"55vh"}
      >
        <List
          content={filteredAgents}
          type={"agent"}
          differentiator={"AgentList"}
          onDelete={this.handleDeleteAgent}
          doesCollapse={true}
          collapseContent={["agentControl"]}
        />
        <div id="agent-control-modal" className="modal fade" role="dialog">
          <div
            className={
              Children.count(this.props.children) == 1
                ? "modal-dialog"
                : "modal-dialog modal-lg"
            }
          >
            <div className="modal-content">
              <div className="modal-header py-0 justify-content-center">
                <div className="fs-5 m-1">
                  {selectedAgent ? selectedAgent.name : ""}
                </div>
              </div>
              <div className="modal-body row">
                <div className="col-4 mx-1 p-0">
                  <Panel frameType={"scroll"} scrollHeight={"80vh"}>
                    <ClusterToggle />
                  </Panel>
                </div>
                <div className="col mx-1 p-0">
                  <Panel frameType={"scroll"} scrollHeight={"80vh"}>
                    <AgentForm update={true} />
                  </Panel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    );
  }
}

const mapStateToProps = (state) => ({
  encounterAgents: state.encounters.encounterAgents,
  selectedAgent: state.agents.selectedAgent,
});

export default connect(mapStateToProps, { deleteAgent })(AgentList);
