import {
  GET_AGENTS,
  ADD_AGENT,
  DELETE_AGENT,
  UPDATE_AGENT,
  TOGGLE_CLUSTER_MEMBERSHIP,
  SELECT_ENCOUNTER,
  SELECT_AGENT,
  ACTIVATE_AGENT,
  IMPORT_AGENT,
  UPDATE_CLUSTER,
  QUICK_CLUSTER,
  RUN_ENCOUNTER,
  DELETE_CLUSTER,
} from "../actions/types.js";

const initialState = {
  agents: [],
  selectedAgent: {},
  selectedAgentClusters: [],
  activeAgent: {},
  activeAgentClusters: [],
};

const orderAgents = (agents) => {
  const typeOrder = {
    character: 0,
    npc: 1,
    monster: 1,
    event: 1,
  };
  return agents.sort((a, b) => {
    return (
      b.initiative - a.initiative ||
      b.initiative_bonus - a.initiative_bonus ||
      typeOrder[a.type] - typeOrder[b.type] ||
      a.name - b.name ||
      a.id - b.id
    );
  });
};

const orderClusters = (clusters) => {
  const typeOrder = {
    location: 0,
    status: 1,
    condition: 2,
    timer: 3,
    faction: 4,
  };
  return clusters.sort((a, b) => {
    return (
      typeOrder[a.type] - typeOrder[b.type] || a.name - b.name || a.id - b.id
    );
  });
};

const filterSystemClusters = (clusters) => {
  return [...clusters.filter((cluster) => cluster.type != "system")];
};

const hasCluster = (clusterArray, clusterId) => {
  return clusterArray.filter((cluster) => cluster.id == clusterId).length > 0;
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AGENTS:
      return {
        ...state,
        agents: orderAgents(action.payload),
      };
    case ADD_AGENT:
      return {
        ...state,
        agents: orderAgents([...state.agents, action.payload]),
        selectedAgent: action.payload,
      };
    case DELETE_AGENT:
      return {
        ...state,
        agents: orderAgents(
          state.agents.filter((agent) => agent.id != action.payload)
        ),
        selectedAgent: {},
        selectedAgentClusters: [],
        activeAgent:
          state.activeAgent.id == action.payload ? {} : state.activeAgent,
        activeAgentClusters:
          state.activeAgent.id == action.payload
            ? []
            : state.activeAgentClusters,
      };
    case IMPORT_AGENT:
      return {
        ...state,
        agents: orderAgents([...state.agents, action.payload]),
      };
    case UPDATE_AGENT:
      return {
        ...state,
        agents: orderAgents([
          ...state.agents.filter((agent) => agent.id != action.payload.id),
          action.payload,
        ]),
        selectedAgent:
          state.selectedAgent.id == action.payload.id
            ? action.payload
            : state.selectedAgent,
        activeAgent:
          state.activeAgent.id == action.payload.id
            ? action.payload
            : state.activeAgent,
      };
    case DELETE_CLUSTER:
      return {
        ...state,
        selectedAgentClusters: hasCluster(
          state.selectedAgentClusters,
          action.payload
        )
          ? orderClusters(
              filterSystemClusters([
                ...state.selectedAgentClusters.filter(
                  (cluster) => cluster.id != action.payload
                ),
              ])
            )
          : state.selectedAgentClusters,
        activeAgentClusters: hasCluster(
          state.activeAgentClusters,
          action.payload
        )
          ? orderClusters(
              filterSystemClusters([
                ...state.activeAgentClusters.filter(
                  (cluster) => cluster.id != action.payload
                ),
              ])
            )
          : state.activeAgentClusters,
      };
    case UPDATE_CLUSTER:
      return {
        ...state,
        selectedAgentClusters: hasCluster(
          state.selectedAgentClusters,
          action.payload.id
        )
          ? orderClusters(
              filterSystemClusters([
                ...state.selectedAgentClusters.filter(
                  (cluster) => cluster.id != action.payload.id
                ),
                action.payload,
              ])
            )
          : state.selectedAgentClusters,
        activeAgentClusters: hasCluster(
          state.activeAgentClusters,
          action.payload.id
        )
          ? orderClusters(
              filterSystemClusters([
                ...state.activeAgentClusters.filter(
                  (cluster) => cluster.id != action.payload.id
                ),
                action.payload,
              ])
            )
          : state.activeAgentClusters,
      };
    case TOGGLE_CLUSTER_MEMBERSHIP:
      const isActive = action.payload["agent"].id == state.activeAgent.id;
      const isSelected = action.payload["agent"].id == state.selectedAgent.id;
      if (action.payload["action"] == "added to") {
        return {
          ...state,
          selectedAgentClusters: isSelected
            ? orderClusters(
                filterSystemClusters([
                  ...state.selectedAgentClusters,
                  action.payload["cluster"],
                ])
              )
            : state.selectedAgentClusters,
          activeAgentClusters: isActive
            ? orderClusters(
                filterSystemClusters([
                  ...state.activeAgentClusters,
                  action.payload["cluster"],
                ])
              )
            : state.activeAgentClusters,
        };
      } else
        return {
          ...state,
          selectedAgentClusters: isSelected
            ? orderClusters(
                filterSystemClusters(
                  state.selectedAgentClusters.filter(
                    (cluster) => cluster.id != action.payload["cluster"].id
                  )
                )
              )
            : state.selectedAgentClusters,
          activeAgentClusters: isActive
            ? orderClusters(
                filterSystemClusters(
                  state.activeAgentClusters.filter(
                    (cluster) => cluster.id != action.payload["cluster"].id
                  )
                )
              )
            : state.activeAgentClusters,
        };
    case SELECT_AGENT:
      if (action.payload == null) {
        return {
          ...state,
          selectedAgent: {},
          selectedAgentClusters: [],
        };
      } else {
        return {
          ...state,
          selectedAgent: action.payload["agent"],
          selectedAgentClusters: orderClusters(
            filterSystemClusters(action.payload["clusters"])
          ),
        };
      }
    case ACTIVATE_AGENT:
      if (action.payload == null) {
        return {
          ...state,
          activeAgent: {},
          activeAgentClusters: [],
        };
      } else {
        return {
          ...state,
          activeAgent: action.payload["agent"],
          activeAgentClusters: orderClusters(
            filterSystemClusters(action.payload["clusters"])
          ),
        };
      }
    case RUN_ENCOUNTER:
      return {
        ...state,
        activeAgent: action.payload["activeAgent"],
        activeAgentClusters: orderClusters(
          filterSystemClusters(action.payload["activeAgentClusters"])
        ),
      };
    case SELECT_ENCOUNTER:
      return {
        ...state,
        activeAgent: {},
        activeAgentClusters: [],
      };
    case QUICK_CLUSTER:
      return {
        ...state,
        activeAgentClusters: orderClusters(
          filterSystemClusters(
            [...state.activeAgentClusters],
            action.payload["quickCluster"]
          )
        ),
        selectedAgentClusters:
          state.activeAgent.id == state.selectedAgent.id
            ? orderClusters(
                filterSystemClusters(
                  [...state.selectedAgentClusters],
                  action.payload["quickCluster"]
                )
              )
            : state.selectedAgentClusters,
      };
    default:
      return state;
  }
}
