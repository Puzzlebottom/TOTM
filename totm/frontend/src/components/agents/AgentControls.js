import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { selectAgent, updateAgent } from "../../actions/agents";
import Icon from "../layout/Icon";
import { v4 as uuid } from "uuid";

export class AgentControls extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getAggroOptions = this.getAggroOptions.bind(this);
  }

  static propTypes = {};

  onChange(e) {
    const agent = structuredClone(
      this.props.encounterAgents.filter(
        (agent) => agent.id == this.props.agentId
      )[0]
    );
    const field = e.target.name;
    const emptyValue = field == "armor_class" || field == "hit_points" ? 0 : "";
    agent[field] = e.target.value || emptyValue;
    this.props.updateAgent(agent.id, agent);
  }

  handleClick(e) {
    this.props.selectAgent(this.props.agentId);
  }

  getAggroOptions() {
    return this.props.encounterAgents
      .filter(
        (agent) => agent.id != this.props.agentId && agent.type != "event"
      )
      .map((agent) => (
        <option key={"aggro" + agent.id} name="aggro" value={agent.id}>
          {agent.alias ? agent.name + " (" + agent.alias + ")" : agent.name}
        </option>
      ));
  }

  render() {
    const { mini } = this.props;
    const agent = this.props.encounterAgents.filter(
      (agent) => agent.id == this.props.agentId
    )[0];

    const getNumberInput = (field) => {
      return (
        <input
          type="number"
          name={field}
          value={agent[field] || 0}
          className="m-0 p-0 text-center menu-input small"
          onChange={this.onChange}
        />
      );
    };

    const getToggle = (action) => {
      return (
        <div
          className={
            mini
              ? "col-auto m-0 p-0 form-check form-switch text-start d-flex align-items-center justify-content-center toggle no-pointer-events"
              : "col-auto m-0 p-0 form-check form-switch text-start d-flex align-items-center justify-content-center big-toggle no-pointer-events"
          }
        >
          <div
            className={
              agent[action] == 1
                ? "m-0 p-0 action-label no-pointer-events text-light"
                : "m-0 p-0 action-label no-pointer-events"
            }
          >
            {action[0].toUpperCase()}
          </div>
          <input
            className="form-check-input m-0 p-0 yes-pointer-events"
            type="checkbox"
            checked={agent[action] == 1}
            name={action}
            value={agent[action] == 1 ? 0 : 1}
            onChange={this.onChange}
          />
        </div>
      );
    };

    const aliasInput = (
      <input
        key={"alias-input-" + agent.id}
        type="text"
        className="form-control form-control-sm mb-2"
        name="alias"
        defaultValue={agent.alias}
        placeholder="Alias"
        onBlur={this.onChange}
      />
    );

    const aggroInput = (
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
    );

    const miniControls = (
      <Fragment key={uuid}>
        <div className="row m-0 p-0 mb-2">{aliasInput}</div>
        <div className="row m-0 p-0 mb-2">
          <div className="row m-0 px-1 d-flex justify-content-center">
            <Icon
              icon={"pencil"}
              size={30}
              onClick={this.handleClick}
              modal={true}
            />
            <div className="col-auto d-flex toggle-box">
              {getToggle("action")}
              {getToggle("move")}
              {getToggle("bonus")}
              {getToggle("reaction")}
              {getToggle("free")}
              {getToggle("exclamation")}
            </div>
            <Icon
              icon={"shield"}
              size={30}
              input={getNumberInput("armor_class")}
            />
            <Icon
              icon={"heart"}
              size={30}
              input={getNumberInput("hit_points")}
            />
          </div>
        </div>
        <div className="row m-0 p-0">{aggroInput}</div>
      </Fragment>
    );

    return mini ? (
      miniControls
    ) : (
      <Fragment key={uuid}>
        {mini ? <div className="row m-0 p-0 mb-2">{aliasInput}</div> : <></>}
        <div className="row m-0 p-0">
          <Icon
            icon={"pencil"}
            size={mini ? 30 : 45}
            onClick={this.handleClick}
            modal={true}
          />
          <div className="col-auto m-0 p-0 d-flex">
            {getToggle("action")}
            {getToggle("move")}
            {getToggle("bonus")}
            {getToggle("reaction")}
            {getToggle("free")}
            {getToggle("exclamation")}
          </div>
          <Icon
            icon={"shield"}
            size={mini ? 30 : 45}
            input={getNumberInput("armor_class")}
          />
          <Icon
            icon={"heart"}
            size={mini ? 30 : 45}
            input={getNumberInput("hit_points")}
          />
        </div>
        {mini ? <div className="row m-0 p-0">{aggroInput}</div> : <></>}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  encounterAgents: state.encounters.encounterAgents,
});
export default connect(mapStateToProps, { selectAgent, updateAgent })(
  AgentControls
);
