import React, { Component } from "react";
import { connect } from "react-redux";
import { clusterAgent } from "../../actions/encounters";
import PropTypes from "prop-types";

export class AgentToggle extends Component {
  constructor(props) {
    super(props);

    this.toggleClusterInclusion = this.toggleClusterInclusion.bind(this);
  }

  static propTypes = {
    selectedEncounter: PropTypes.object.isRequired,
    encounterAgents: PropTypes.array.isRequired,
    encounterClusters: PropTypes.array.isRequired,
    selectedCluster: PropTypes.object.isRequired,
    selectedClusterAgents: PropTypes.array.isRequired,
    clusterAgent: PropTypes.func.isRequired,
  };

  toggleClusterInclusion = (e) => {
    const agentId = parseInt(e.target.id);
    const clusterId = this.props.selectedCluster.id;
    const encounterId = this.props.selectedEncounter.id;
    this.props.clusterAgent(encounterId, agentId, clusterId);
  };

  render() {
    const cluster = this.props.selectedCluster;
    const encounterAgents = this.props.encounterAgents;
    const clusterAgents = this.props.selectedClusterAgents;

    const isClustered = (id) => {
      return (
        clusterAgents.filter((agent) => {
          return agent.id == id;
        }).length > 0
      );
    };

    return (
      <div className="text-start">
        <div className="form-check form-switch">
          {encounterAgents.map((agent) => {
            return (
              <div key={"agent" + agent.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isClustered(agent.id)}
                  onChange={this.toggleClusterInclusion}
                  id={agent.id}
                />
                <label className="form-check-label small" htmlFor={agent.id}>
                  {agent.alias
                    ? agent.name + " (" + agent.alias + ")"
                    : agent.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedEncounter: state.encounters.selectedEncounter,
  encounterAgents: state.encounters.encounterAgents,
  encounterClusters: state.encounters.encounterClusters,
  selectedCluster: state.clusters.selectedCluster,
  selectedClusterAgents: state.clusters.selectedClusterAgents,
});

export default connect(mapStateToProps, { clusterAgent })(AgentToggle);
