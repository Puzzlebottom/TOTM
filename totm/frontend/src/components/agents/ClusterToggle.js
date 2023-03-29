import React, { Component } from "react";
import { connect } from "react-redux";
import { clusterAgent } from "../../actions/encounters";
import PropTypes from "prop-types";

export class ClusterToggle extends Component {
  constructor(props) {
    super(props);

    this.toggleClusterInclusion = this.toggleClusterInclusion.bind(this);
  }

  static propTypes = {
    selectedEncounter: PropTypes.object.isRequired,
    encounterAgents: PropTypes.array.isRequired,
    encounterClusters: PropTypes.array.isRequired,
    selectedAgent: PropTypes.object.isRequired,
    selectedAgentClusters: PropTypes.array.isRequired,
    clusterAgent: PropTypes.func.isRequired,
  };

  toggleClusterInclusion = (e) => {
    const clusterId = parseInt(e.target.id);
    const agentId =
      this.props.active == true
        ? this.props.activeAgent.id
        : this.props.selectedAgent.id;
    const encounterId = this.props.selectedEncounter.id;
    this.props.clusterAgent(encounterId, agentId, clusterId);
  };

  render() {
    const agent = this.props.active
      ? this.props.activeAgent
      : this.props.selectedAgent;
    const agentClusters = this.props.active
      ? this.props.activeAgentClusters
      : this.props.selectedAgentClusters;
    const encounterClusters = this.props.encounterClusters;

    const hasAgent = (id) => {
      return (
        agentClusters.filter((cluster) => {
          return cluster.id == id;
        }).length > 0
      );
    };

    const filteredClusters = () => {
      const { filter } = this.props;
      if (filter == "member") {
        return agentClusters;
      } else if (filter == "owned") {
        return encounterClusters.filter((cluster) => cluster.owner == agent.id);
      } else {
        return encounterClusters;
      }
    };

    return (
      <div className="text-start">
        <div className="form-check form-switch">
          {filteredClusters().map((cluster) => {
            return (
              <div key={"cluster" + cluster.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={hasAgent(cluster.id)}
                  onChange={this.toggleClusterInclusion}
                  id={cluster.id}
                />
                <label className="form-check-label small" htmlFor={cluster.id}>
                  {cluster.name}
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
  selectedAgent: state.agents.selectedAgent,
  selectedAgentClusters: state.agents.selectedAgentClusters,
  activeAgent: state.agents.activeAgent,
  activeAgentClusters: state.agents.activeAgentClusters,
});

export default connect(mapStateToProps, { clusterAgent })(ClusterToggle);
