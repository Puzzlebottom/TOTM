import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import TurnCard from "./TurnCard";
import AgentList from "./AgentList";
import ClusterList from "./ClusterList";
import { updateEncounter } from "../../actions/encounters";
import { toggleInGame, createReminder } from "../../actions/messages";
import { selectAgent, updateAgent, activateAgent } from "../../actions/agents";
import {
  updateCluster,
  deleteCluster,
  getClusterAgents,
} from "../../actions/clusters";

export class CombatTracker extends Component {
  constructor(props) {
    super(props);

    this.handleNextTurn = this.handleNextTurn.bind(this);
    this.getReminders = this.getReminders.bind(this);
    this.loadAgent = this.loadAgent.bind(this);
    this.advanceTimers = this.advanceTimers.bind(this);
    this.advanceTurn = this.advanceTurn.bind(this);
    this.checkExpirations = this.checkExpirations.bind(this);
    this.handlePreviousTurn = this.handlePreviousTurn.bind(this);
    this.reverseTimers = this.reverseTimers.bind(this);
    this.setActions = this.setActions.bind(this);
  }

  static propTypes = {
    selectedEncounter: PropTypes.object.isRequired,
    encounterAgents: PropTypes.array.isRequired,
    selectAgent: PropTypes.func.isRequired,
    updateEncounter: PropTypes.func.isRequired,
    toggleInGame: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.toggleInGame();
  }

  componentWillUnmount() {
    this.props.toggleInGame();
    toast.dismiss();
  }

  loadAgent(turn) {
    const turnIndex = turn - 1;
    const agent = this.props.encounterAgents[turnIndex];
    this.setActions(agent);
    this.props.activateAgent(agent.id);
  }

  getReminders(action) {
    const encounter = this.props.selectedEncounter;
    const agents = this.props.encounterAgents;
    const clusters = this.props.encounterClusters;
    const lookup = structuredClone(this.props.clusterAgentLookup);

    const isRoundEnd = encounter.turn == agents.length;
    const turnIndex = encounter.turn - 1;
    const activeAgent = this.props.activeAgent;
    const nextActiveAgent = isRoundEnd ? agents[0] : agents[turnIndex + 1];

    const getTurnStartReminders = (cluster) => {
      const atRoundStart = cluster.reminder_round_start == true;
      const atTurnStart = cluster.reminder_all_start == true;
      const atMemberStart = cluster.reminder_member_start == true;
      const index = lookup.findIndex(
        (entry) => entry["clusterId"] == cluster.id
      );
      console.log("index: " + index);
      console.log("nextId: " + nextActiveAgent.id);
      const isMemberTurn = lookup[index]["agentIds"].includes(
        nextActiveAgent.id
      );
      const atOwnerStart = cluster.reminder_owner_start == true;
      const isOwnerTurn = cluster.owner == nextActiveAgent.id;
      const atTimerTerm =
        cluster.timer_count == 1 ||
        (cluster.timer_count >= 1 && cluster.timer_term != "at timer end") ||
        (cluster.timer_count == null && cluster.timer_term == "indefinite");

      const remind = () => {
        this.props.createReminder({
          turnStartReminder: cluster.reminder_text,
        });
      };

      if (!atTimerTerm) {
        return;
      } else if (atTurnStart) {
        console.log("one");
        remind();
        return;
      } else if (atRoundStart && isRoundEnd) {
        console.log("two");
        remind();
        return;
      } else if (atOwnerStart && isOwnerTurn) {
        console.log("three");
        remind();
        return;
      } else if (atMemberStart && isMemberTurn) {
        console.log("four");
        remind();
        return;
      }
    };

    const getTurnEndReminders = (cluster) => {
      const atRoundEnd = cluster.reminder_round_end == true;
      const atTurnEnd = cluster.reminder_all_end == true;
      const atMemberEnd = cluster.reminder_member_end == true;
      const index = lookup.findIndex(
        (entry) => (entry["clusterId"] = cluster.id)
      );
      const isMemberTurn = lookup[index]["agentIds"].includes(activeAgent.id);
      const atOwnerEnd = cluster.reminder_owner_end == true;
      const isOwnerTurn = cluster.owner == activeAgent.id;
      const atTimerTerm =
        cluster.timer_count == 0 ||
        (cluster.timer_count >= 0 && cluster.timer_term != "at timer end") ||
        (cluster.timer_count == null && cluster.timer_term == "indefinite");

      const remind = () => {
        this.props.createReminder({
          turnEndReminder: cluster.reminder_text,
        });
      };

      if (!atTimerTerm) {
      } else if (atTurnEnd) {
        console.log("six");
        remind();
      } else if (atRoundEnd && isRoundEnd) {
        console.log("seven");
        remind();
      } else if (atOwnerEnd && isOwnerTurn) {
        console.log("eight");
        remind();
      } else if (atMemberEnd && isMemberTurn) {
        console.log("nine");
        remind();
      }
    };

    clusters.map((cluster) =>
      action == "start"
        ? getTurnStartReminders(cluster)
        : getTurnEndReminders(cluster)
    );
  }

  advanceTimers() {
    const encounter = this.props.selectedEncounter;
    const agents = this.props.encounterAgents;
    const clusters = this.props.encounterClusters;
    const isRoundEnd = encounter.turn == agents.length;
    const turnIndex = encounter.turn - 1;
    const nextActiveAgent = isRoundEnd ? agents[0] : agents[turnIndex + 1];

    clusters
      .filter((cluster) => {
        return cluster.timer_count >= 0;
      })
      .map((cluster) => {
        const advance = (cluster) => {
          cluster.timer_count = cluster.timer_count - 1;
          this.props.updateCluster(cluster.id, cluster);
        };

        const copy = structuredClone(cluster);

        if (copy.timer_term == "indefinite") {
          return;
        } else if (cluster.owner == nextActiveAgent.id) {
          advance(copy);
        } else if (!cluster.owner && isRoundEnd) {
          advance(copy);
        }
      });
  }

  checkExpirations() {
    const clusters = this.props.encounterClusters;
    clusters.map((cluster) => {
      if (cluster.timer_count == 0 && cluster.expiry == true) {
        this.props.deleteCluster(cluster.id);
      }
    });
  }

  reverseTimers() {
    this.props.encounterClusters
      .filter((cluster) => {
        return cluster.timer_count >= 0;
      })
      .map((cluster) => {
        const copy = structuredClone(cluster);
        copy.timer_count = copy.timer_count + 1;
        this.props.updateCluster(copy.id, copy);
      });
  }

  setActions(nextAgent) {
    const n = structuredClone(nextAgent);
    n.action = true;
    n.move = true;
    n.bonus = true;
    n.reaction = true;
    n.free = true;
    n.exclamation = true;
    this.props.updateAgent(n.id, n);
  }

  advanceTurn() {
    const encounter = this.props.selectedEncounter;
    const agents = this.props.encounterAgents;
    const roundEnd = agents.length;

    if (encounter.turn == roundEnd) {
      const round = encounter.round + 1;
      const turn = 1;
      this.loadAgent(turn);
      this.props.updateEncounter(encounter.id, {
        round: round,
        turn: turn,
      });
    } else {
      const turn = encounter.turn + 1;
      this.loadAgent(turn);
      this.props.updateEncounter(encounter.id, { turn: turn });
    }
  }

  handleNextTurn(e) {
    e.preventDefault();
    this.getReminders("start");
    this.advanceTimers();
    this.advanceTurn();
    this.getReminders("end");
    this.checkExpirations();
  }

  handlePreviousTurn(e) {
    e.preventDefault();
    const encounter = this.props.selectedEncounter;
    const agents = this.props.encounterAgents;
    const roundEnd = agents.length;

    if (encounter.turn == 1 && encounter.round == 1) {
      return;
    } else if (encounter.turn == 1) {
      const round = encounter.round - 1;
      const turn = roundEnd;
      this.loadAgent(turn);
      this.reverseTimers();
      this.props.updateEncounter(encounter.id, {
        round: round,
        turn: turn,
      });
    } else {
      const turn = encounter.turn - 1;
      this.loadAgent(turn);
      this.props.updateEncounter(encounter.id, { turn: turn });
    }
  }

  render() {
    const { selectedEncounter } = this.props;

    const nextTurnButton = (
      <button
        className="btn btn-light border next-turn"
        onClick={this.handleNextTurn}
      >
        <img
          src="static/frontend/icons/caret-right-fill.svg"
          className="opacity-50 turn-button-arrow m-0 p-0"
        />
      </button>
    );

    const previousTurnButton = (
      <button
        className="btn btn-light border previous-turn"
        id="previous-turn"
        onClick={this.handlePreviousTurn}
      >
        <img
          src="static/frontend/icons/caret-left-fill.svg"
          className="opacity-50 turn-button-arrow m-0 p-0"
        />
      </button>
    );

    const activeIndex = selectedEncounter.turn - 1;

    return (
      <div className="row">
        {previousTurnButton}
        <div className="col px-0">
          <TurnCard />
        </div>
        <div className="col-3 px-0">
          <AgentList />
        </div>
        <div className="col-3 px-0">
          <ClusterList />
        </div>
        {nextTurnButton}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedEncounter: state.encounters.selectedEncounter,
  clusterAgentLookup: state.encounters.clusterAgentLookup,
  encounterAgents: state.encounters.encounterAgents,
  encounterClusters: state.encounters.encounterClusters,
  activeAgent: state.agents.activeAgent,
  agentList: state.clusters.agentList,
});

export default connect(mapStateToProps, {
  toggleInGame,
  createReminder,
  selectAgent,
  updateAgent,
  activateAgent,
  updateEncounter,
  deleteCluster,
  updateCluster,
  getClusterAgents,
})(CombatTracker);
