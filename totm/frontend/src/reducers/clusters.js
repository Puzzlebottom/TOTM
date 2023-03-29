import {
  GET_CLUSTERS,
  ADD_CLUSTER,
  DELETE_CLUSTER,
  UPDATE_CLUSTER,
  QUICK_CLUSTER,
  TOGGLE_CLUSTER_MEMBERSHIP,
  SELECT_CLUSTER,
  UPDATE_AGENT,
  DELETE_AGENT,
  RUN_ENCOUNTER,
  GET_CLUSTER_AGENTS,
} from "../actions/types.js";

const initialState = {
  clusters: [],
  selectedCluster: {},
  selectedClusterAgents: [],
  placeholderId: 0,
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

const hasAgent = (agentArray, agentId) => {
  return agentArray.filter((agent) => agent.id == agentId).length > 0;
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CLUSTERS:
      return {
        ...state,
        clusters: orderClusters(filterSystemClusters(action.payload)),
      };
    case ADD_CLUSTER:
      return {
        ...state,
        clusters: orderClusters(
          filterSystemClusters([...state.clusters, action.payload])
        ),
        selectedCluster: action.payload,
      };
    case DELETE_CLUSTER:
      return {
        ...state,
        clusters: orderClusters(
          filterSystemClusters(
            state.clusters.filter((cluster) => cluster.id !== action.payload)
          )
        ),
        selectedCluster:
          state.selectedCluster.id == action.payload
            ? {}
            : state.selectedCluster,
      };
    case UPDATE_CLUSTER:
      return {
        ...state,
        clusters: orderClusters(
          filterSystemClusters([
            ...state.clusters.filter(
              (cluster) => cluster.id !== action.payload.id
            ),
            action.payload,
          ])
        ),
        selectedCluster:
          state.selectedCluster.id == action.payload.id
            ? action.payload
            : state.selectedCluster,
      };
    case DELETE_AGENT:
      return {
        ...state,
        selectedClusterAgents: hasAgent(
          state.selectedClusterAgents,
          action.payload
        )
          ? orderAgents([
              ...state.selectedClusterAgents.filter(
                (agent) => agent.id != action.payload
              ),
            ])
          : state.selectedClusterAgents,
      };
    case UPDATE_AGENT:
      return {
        ...state,
        selectedClusterAgents: hasAgent(
          state.selectedClusterAgents,
          action.payload.id
        )
          ? orderAgents([
              ...state.selectedClusterAgents.filter(
                (agent) => agent.id == action.payload.id
              ),
              action.payload,
            ])
          : state.selectedClusterAgents,
      };
    case TOGGLE_CLUSTER_MEMBERSHIP:
      const isSelected =
        action.payload["cluster"].id == state.selectedCluster.id;

      if (action.payload["action"] == "added to") {
        return {
          ...state,
          selectedClusterAgents: isSelected
            ? orderAgents([
                ...state.selectedClusterAgents,
                action.payload["agent"],
              ])
            : state.selectedClusterAgents,
        };
      } else
        return {
          ...state,
          selectedClusterAgents: isSelected
            ? orderAgents(
                state.selectedClusterAgents.filter(
                  (agent) => agent.id != action.payload["agent"].id
                )
              )
            : state.selectedClusterAgents,
        };
    case SELECT_CLUSTER:
      if (action.payload == null) {
        return {
          ...state,
          selectedCluster: {},
          selectedClusterAgents: [],
        };
      } else {
        return {
          ...state,
          selectedCluster: action.payload["cluster"],
          selectedClusterAgents: orderAgents(action.payload["agents"]),
        };
      }
    case QUICK_CLUSTER:
      return {
        ...state,
        placeholderId: action.payload["placeholder"].id,
        clusters: filterSystemClusters([
          ...state.clusters,
          action.payload["quickCluster"],
        ]),
      };
    case RUN_ENCOUNTER:
      return {
        ...state,
        placeholderId: action.payload["placeholder"].id,
      };
    case GET_CLUSTER_AGENTS:
      return {
        ...state,
        agentList: action.payload.agents,
      };
    default:
      return state;
  }
}
