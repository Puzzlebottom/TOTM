import {
  GET_ENCOUNTERS,
  ADD_ENCOUNTER,
  DELETE_ENCOUNTER,
  UPDATE_ENCOUNTER,
  SELECT_ENCOUNTER,
  RUN_ENCOUNTER,
  IMPORT_AGENT,
  DELETE_AGENT,
  UPDATE_AGENT,
  ADD_CLUSTER,
  DELETE_CLUSTER,
  UPDATE_CLUSTER,
  QUICK_CLUSTER,
  TOGGLE_CLUSTER_MEMBERSHIP,
} from "../actions/types.js";

const initialState = {
  encounters: [],
  selectedEncounter: {},
  encounterAgents: [],
  encounterClusters: [],
  activeEncounters: [],
  clusterAgentLookup: [],
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

const updateClusterAgentLookup = (lookup, clusterId, agentId, action) => {
  const index = lookup.findIndex((entry) => entry.clusterId == clusterId);
  const newLookup = structuredClone(lookup);
  if (newLookup[index].agentIds.length == 0) {
    newLookup[index].agentIds = [agentId];
  } else if (action == "added to") {
    const agents = newLookup[index].agentIds;
    agents.push(agentId);
    newLookup[index].agentIds = agents;
  } else {
    const agents = newLookup[index].agentIds.filter((id) => id != agentId);
    newLookup[index].agentIds = agents;
  }
  return newLookup;
};

export default function (state = initialState, action) {
  const isSelected = state.selectedEncounter.id == action.payload;
  const isActive =
    state.activeEncounters.filter((encounter) => encounter.id == action.payload)
      .length > 0;
  const includes = (array, id) => {
    return array.filter((element) => element.id == id).length > 0;
  };
  switch (action.type) {
    case GET_ENCOUNTERS:
      return {
        ...state,
        encounters: action.payload,
      };
    case ADD_ENCOUNTER:
      return {
        ...state,
        encounters: [...state.encounters, action.payload],
      };
    case DELETE_ENCOUNTER:
      return {
        ...state,
        encounters: state.encounters.filter(
          (encounter) => encounter.id != action.payload
        ),
        selectedEncounter: isSelected ? {} : state.selectedEncounter,
        encounterAgents: isSelected ? [] : state.encounterAgents,
        encounterClusters: isSelected ? [] : state.encounterClusters,
        activeEncounters: isActive
          ? [
              ...activeEncounters.filter(
                (encounter) => encounter.id != action.payload
              ),
            ]
          : state.activeEncounters,
      };
    case UPDATE_ENCOUNTER:
      return {
        ...state,
        encounters: [
          ...state.encounters.filter(
            (encounter) => encounter.id != action.payload.id
          ),
          action.payload,
        ],
        selectedEncounter: action.payload,
      };
    case SELECT_ENCOUNTER:
      if (action.payload == null) {
        return {
          ...state,
          selectedEncounter: {},
          encounterAgents: [],
          encounterClusters: [],
        };
      } else {
        return {
          ...state,
          selectedEncounter: action.payload["encounter"],
          encounterAgents: orderAgents(action.payload["encounterAgents"]),
          encounterClusters: orderClusters(
            filterSystemClusters(action.payload["encounterClusters"])
          ),
        };
      }
    case RUN_ENCOUNTER:
      return {
        ...state,
        activeEncounters: [
          ...state.activeEncounters,
          action.payload["encounter"],
        ],
        selectedEncounter: action.payload["encounter"],
        encounterAgents: orderAgents(action.payload["encounterAgents"]),
        encounterClusters: orderClusters(
          filterSystemClusters(action.payload["encounterClusters"])
        ),
        clusterAgentLookup: action.payload["clusterAgentLookup"],
      };
    case IMPORT_AGENT:
      return {
        ...state,
        encounterAgents: orderAgents([
          ...state.encounterAgents,
          action.payload,
        ]),
      };
    case DELETE_AGENT:
      return {
        ...state,
        encounterAgents: includes(state.encounterAgents, action.payload)
          ? orderAgents([
              ...state.encounterAgents.filter(
                (agent) => agent.id != action.payload
              ),
            ])
          : state.encounterAgents,
      };
    case UPDATE_AGENT:
      if (action.payload.encounter == state.selectedEncounter.id) {
        return {
          ...state,
          encounterAgents: orderAgents([
            ...state.encounterAgents.filter(
              (agent) => agent.id != action.payload.id
            ),
            action.payload,
          ]),
        };
      }
    case ADD_CLUSTER:
      if (action.payload.encounter == state.selectedEncounter.id) {
        return {
          ...state,
          encounterClusters: orderClusters(
            filterSystemClusters([...state.encounterClusters, action.payload])
          ),
        };
      }
    case DELETE_CLUSTER:
      return {
        ...state,
        encounterClusters: includes(state.encounterClusters, action.payload)
          ? orderClusters(
              filterSystemClusters(
                state.encounterClusters.filter(
                  (cluster) => cluster.id != action.payload
                )
              )
            )
          : state.encounterClusters,
      };
    case UPDATE_CLUSTER:
      if (action.payload.encounter == state.selectedEncounter.id) {
        return {
          ...state,
          encounterClusters: orderClusters(
            filterSystemClusters([
              ...state.encounterClusters.filter(
                (cluster) => cluster.id != action.payload.id
              ),
              action.payload,
            ])
          ),
        };
      }
    case QUICK_CLUSTER:
      return {
        ...state,
        encounterClusters: orderClusters(
          filterSystemClusters([
            ...state.encounterClusters,
            action.payload["quickCluster"],
          ])
        ),
      };
    case TOGGLE_CLUSTER_MEMBERSHIP:
      return {
        ...state,
        encounterAgents:
          action.payload["agent"].encounter_id == state.selectedEncounter.id
            ? [
                ...state.encounterAgents.filter(
                  (agent) => agent.id != action.payload["agent"].id
                ),
                action.payload["agent"],
              ]
            : state.encounterAgents,
        encounterClusters:
          action.payload["cluster"].encounter_id == state.selectedEncounter.id
            ? filterSystemClusters([
                ...state.encounterClusters.filter(
                  (cluster) => cluster.id != action.payload["cluster"].id
                ),
                action.payload["cluster"],
              ])
            : state.encounterClusters,
        clusterAgentLookup: updateClusterAgentLookup(
          state.clusterAgentLookup,
          action.payload["cluster"].id,
          action.payload["agent"].id,
          action.payload["action"]
        ),
      };
    default:
      return state;
  }
}
