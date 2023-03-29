import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteAgent } from "../../actions/agents";
import {
  deleteCluster,
  updateCluster,
  selectCluster,
} from "../../actions/clusters";
import AgentImport from "../agents/AgentImport";
import ClusterControl from "../clusters/ClusterControl";
import Panel from "../layout/Panel";
import List from "../layout/List";
import InitiativeRoller from "../tracker/InitiativeRoller";

export class EncounterSetup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectField: "select",
      searchField: "",
    };

    this.handleAgentDelete = this.handleAgentDelete.bind(this);
    this.handleClusterDelete = this.handleClusterDelete.bind(this);
  }

  static propTypes = {
    selectedEncounter: PropTypes.object.isRequired,
    encounterAgents: PropTypes.array.isRequired,
    encounterClusters: PropTypes.array.isRequired,
    deleteAgent: PropTypes.func.isRequired,
  };

  handleAgentDelete = (e) => {
    e.stopPropagation();
    this.props.deleteAgent(parseInt(e.target.getAttribute("value")));
  };

  handleClusterDelete = (e) => {
    e.stopPropagation();
    this.props.deleteCluster(parseInt(e.target.getAttribute("value")));
  };

  render() {
    const types = ["character", "npc", "monster", "event"];
    const {
      agents,
      selectedCluster,
      selectedEncounter,
      encounterAgents,
      encounterClusters,
    } = this.props;
    const loaded =
      selectedEncounter && Object.keys(selectedEncounter).length !== 0;

    return (
      <div className="rounded-3 mb-3 border shadow-lg">
        <div className="card-header py-3 text-center">
          <h4 className="mb-0">
            {loaded ? selectedEncounter.name.toUpperCase() : ""}
          </h4>
        </div>
        <div className="card-body text-center">
          <div className="row mb-3 justify-content-around">
            <AgentImport />
            <ClusterControl />
            <InitiativeRoller />
          </div>
          <div className="row">
            {types.map((type) => {
              return (
                <Panel
                  key={type}
                  header={<div className="fs-5 m-1">{type.toUpperCase()}</div>}
                  frameType={"scroll"}
                  scrollHeight={"50vh"}
                >
                  <List
                    content={encounterAgents.filter(
                      (agent) => agent.type == type
                    )}
                    type={"agent"}
                    differentiator={"EncounterSetup"}
                    onDelete={this.handleAgentDelete}
                    doesCollapse={true}
                    collapseContent={["detail"]}
                    orderBy={"initiative"}
                  />
                </Panel>
              );
            })}
            <Panel
              header={<div className="fs-5 m-1">CLUSTERS</div>}
              frameType={"scroll"}
              scrollHeight={"50vh"}
            >
              <List
                content={encounterClusters}
                type={"cluster"}
                differentiator={"EncounterSetup"}
                onDelete={this.handleClusterDelete}
                doesCollapse={true}
                collapseContent={["detail"]}
                orderBy={"type"}
              />
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  agents: state.agents.agents,
  selectedCluster: state.clusters.selectedCluster,
  selectedEncounter: state.encounters.selectedEncounter,
  encounterAgents: state.encounters.encounterAgents,
  encounterClusters: state.encounters.encounterClusters,
});

export default connect(mapStateToProps, {
  deleteAgent,
  deleteCluster,
  updateCluster,
  selectCluster,
})(EncounterSetup);
