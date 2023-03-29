import React, { Component } from "react";
import { connect } from "react-redux";
import Panel from "../layout/Panel";
import Icon from "../layout/Icon";
import { updateAgent } from "../../actions/agents";
import { addCluster, createQuickCluster } from "../../actions/clusters";
import { clusterAgent } from "../../actions/encounters";
import AgentControls from "../agents/AgentControls";
import ClusterToggle from "../agents/ClusterToggle";

export class TurnCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: "",
      alias: "",
      clusterControls: "member",
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeClusterControls = this.changeClusterControls.bind(this);
    this.getAggroOptions = this.getAggroOptions.bind(this);
  }

  onChange(e) {
    const agent = { ...this.props.activeAgent };
    const field = e.target.name;
    agent[field] = e.target.value;
    this.props.updateAgent(agent.id, agent);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const cluster = Object.fromEntries(
      Object.entries(Object.fromEntries(formData.entries())).filter(
        ([_, v]) => v != ""
      )
    );
    cluster.reminder_text = this.props.activeAgent.name + "'s " + cluster.name;

    const encounterId = this.props.selectedEncounter.id;
    const agentId = this.props.activeAgent.id;
    const placeholderId = this.props.placeholderId;

    const concentratingCluster = this.props.encounterClusters.filter(
      (cluster) => cluster.name.toLowerCase() == "concentrating"
    )[0];
    if (cluster.concentration) {
      this.props.clusterAgent(encounterId, agentId, concentratingCluster.id);
    }

    const agentIds = Object.keys(cluster).filter(
      (key) => !isNaN(parseInt(key))
    );
    if (agentIds.length > 0) {
      agentIds.map((agentId) => {
        this.props.clusterAgent(encounterId, agentId, placeholderId);
      });
    }
    this.props.createQuickCluster(placeholderId, cluster);

    this.setState({ clusterControls: "owned" });
  }

  changeClusterControls(e) {
    this.setState({ clusterControls: e.currentTarget.value });
  }

  getAggroOptions() {
    const agent = { ...this.props.activeAgent };
    return this.props.encounterAgents
      .filter(
        (encounterAgent) =>
          encounterAgent.id != agent.id && encounterAgent.type != "event"
      )
      .map((encounterAgent) => (
        <option
          key={"aggro" + encounterAgent.id}
          name="aggro"
          value={encounterAgent.id}
        >
          {encounterAgent.alias
            ? encounterAgent.name + " (" + encounterAgent.alias + ")"
            : encounterAgent.name}
        </option>
      ));
  }

  render() {
    const agent = this.props.activeAgent;
    const isLoaded = agent && Object.keys(agent).length > 0;

    const member = isLoaded ? (
      <div
        className="col m-0 p-0 border-start h-100 overflow-scroll"
        key={"agent-cluster-toggle" + agent.id}
      >
        <div className="card-header text-center">Current Clusters</div>
        <div className="card-body">
          <ClusterToggle active={true} filter={"member"} />
        </div>
      </div>
    ) : (
      <></>
    );

    const owned = isLoaded ? (
      <div
        className="col m-0 p-0 border-start h-100 overflow-scroll"
        key={"agent-cluster-owned" + agent.id}
      >
        <div className="card-header text-center">Owned Clusters</div>
        <div className="card-body">
          <ClusterToggle active={true} filter={"owned"} />
        </div>
      </div>
    ) : (
      <></>
    );

    const quick = isLoaded ? (
      <div
        className="col m-0 p-0 border-start h-100 overflow-scroll"
        key={"agent-cluster-quick" + agent.id}
      >
        <div className="card-header text-center">Quick Cluster Create</div>
        <div className="card-body m-1 p-1">
          <form onSubmit={this.handleSubmit}>
            <div className="row mx-0 px-0 mb-1 input-group input-group-sm">
              <span className="col-auto p-1 input-group-text justify-content-center small">
                Name
              </span>
              <input
                type="text"
                autoComplete="off"
                className="col p-1 form-control"
                name="name"
              />
            </div>
            <div className="row mx-0 px-0 mb-1 input-group input-group-sm align-items-center">
              <span className="col-auto p-1 input-group-text justify-content-center small">
                Rounds
              </span>
              <input
                type="number"
                autoComplete="off"
                className="col-auto p-1 form-control"
                defaultValue={1}
                name="timer_count"
                placholder="rounds"
              />
              <div className="col-auto ms-2 px-0 text-end">
                <label className="form-check-label small">Concentration?</label>
              </div>
              <div className="col mx-1 p-0 form-check form-switch text-start d-flex align-items-center rotate-270 quick-toggle">
                <input
                  className="form-check-input m-0 p-0"
                  type="checkbox"
                  name="concentration"
                  disabled={
                    this.props.activeAgentClusters.filter(
                      (cluster) => cluster.name.toLowerCase() == "concentrating"
                    ).length > 0
                  }
                />
              </div>
            </div>
            <div className="row mx-0 px-0">
              <div className="text-start">
                <div className="form-check form-switch">
                  {this.props.encounterAgents.map((agent) => {
                    return (
                      <div key={"candidate" + agent.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name={agent.id}
                          id={agent.id}
                        />
                        <label
                          className="form-check-label small"
                          htmlFor={agent.id}
                        >
                          {agent.alias
                            ? agent.name + " (" + agent.alias + ")"
                            : agent.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <input
              type="hidden"
              name="encounter"
              value={parseInt(this.props.selectedEncounter.id)}
            />
            <input type="hidden" name="type" value="status" />
            <input
              type="hidden"
              name="owner"
              value={parseInt(this.props.activeAgent.id)}
            />
            <input type="hidden" name="timer_term" value="until timer end" />
            <input type="hidden" name="reminder_member_start" value={true} />
            <input type="hidden" name="reminder_owner_start" value={true} />
            <input type="hidden" name="expiry" value={true} />
            <div className="row mx-0 px-0 justify-content-center">
              <button className="btn btn-primary col-8 small" type="submit">
                CREATE
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : (
      <></>
    );

    return isLoaded ? (
      <Panel
        key={"turn-card-" + agent.id}
        header={
          agent.alias
            ? agent.name.toUpperCase() + " (" + agent.alias.toUpperCase() + ")"
            : agent.name.toUpperCase()
        }
        frameType={"borderScroll"}
        scrollHeight={"65vh"}
      >
        <div className="row h-75 m-0 border-bottom overflow-hidden">
          <div className="col-1 mx-1 p-0 text-center">
            <button
              className="btn btn-light my-1 p-2 border"
              value="member"
              onClick={this.changeClusterControls}
            >
              <Icon icon={"toggles"} size={20} />
            </button>
            <button
              className="btn btn-light my-1 p-2 border"
              value="owned"
              onClick={this.changeClusterControls}
            >
              <Icon icon={"diagram"} size={20} />
            </button>
            <button
              className="btn btn-light my-1 p-2 border"
              value="quick"
              onClick={this.changeClusterControls}
            >
              <Icon icon={"plus"} size={20} />
            </button>
          </div>
          {this.state.clusterControls == "member"
            ? member
            : this.state.clusterControls == "owned"
            ? owned
            : quick}
          <div className="col m-0 p-0 h-100 border-start">
            <table className="table table-sm m-0 text-center small">
              <tbody>
                <tr>
                  <td colSpan="3">
                    <table className="table table-sm table-borderless m-0 text-center small">
                      <tbody>
                        <tr>
                          <td>ATTACK BONUS: +{agent.attack_bonus}</td>
                          <td>SPELL SAVE: {agent.spell_save}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="small">
                    SAVES
                  </td>
                  <td className="small">PASSIVES</td>
                </tr>
                <tr className="small">
                  <td>{"STR " + (agent.str_save || 0)}</td>
                  <td>{"INT " + (agent.int_save || 0)}</td>
                  <td>
                    {agent.passive_insight
                      ? "INS " + agent.passive_insight
                      : ""}
                  </td>
                </tr>
                <tr className="small">
                  <td>{"DEX " + (agent.dex_save || 0)}</td>
                  <td>{"WIS " + (agent.wis_save || 0)}</td>
                  <td>
                    {agent.passive_investigation
                      ? "INV " + agent.passive_investigation
                      : ""}
                  </td>
                </tr>
                <tr className="small">
                  <td>{"CON " + (agent.con_save || 0)}</td>
                  <td>{"CHA " + (agent.cha_save || 0)}</td>
                  <td>
                    {agent.passive_perception
                      ? "PER " + agent.passive_perception
                      : ""}
                  </td>
                </tr>
              </tbody>
            </table>
            <textarea
              key={"notes-input-" + agent.id}
              className="form-control turn-card-input"
              name="notes"
              defaultValue={agent.notes}
              placeholder="Notes"
              onBlur={this.onChange}
              autoComplete="off"
              rows="6"
            />
          </div>
        </div>
        <div className="row h-25 px-2 m-0 align-items-center">
          <div className="col-8 p-0">
            <AgentControls agentId={agent.id} size={50} />
          </div>
          <div className="col-4 p-0">
            <input
              key={"alias-input-" + agent.id}
              type="text"
              className="form-control form-control-sm mb-2"
              name="alias"
              defaultValue={agent.alias}
              placeholder="Alias"
              onBlur={this.onChange}
            />
            <select
              className="form-control form-control-sm"
              name="aggro"
              value={agent.aggro || ""}
              onChange={this.onChange}
            >
              <option value="" disabled={true}>
                Select Aggro
              </option>
              {this.getAggroOptions()}
            </select>
          </div>
        </div>
      </Panel>
    ) : (
      <></>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedEncounter: state.encounters.selectedEncounter,
  encounterAgents: state.encounters.encounterAgents,
  encounterClusters: state.encounters.encounterClusters,
  activeAgent: state.agents.activeAgent,
  activeAgentClusters: state.agents.activeAgentClusters,
  placeholderId: state.clusters.placeholderId,
});

export default connect(mapStateToProps, {
  addCluster,
  updateAgent,
  clusterAgent,
  createQuickCluster,
})(TurnCard);
