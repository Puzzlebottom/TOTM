import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_ENCOUNTERS,
  ADD_ENCOUNTER,
  DELETE_ENCOUNTER,
  UPDATE_ENCOUNTER,
  SELECT_ENCOUNTER,
  RUN_ENCOUNTER,
  IMPORT_AGENT,
  TOGGLE_CLUSTER_MEMBERSHIP,
} from "./types";

export const getEncounters = () => (dispatch, getState) => {
  axios
    .get("/api/encounters/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ENCOUNTERS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addEncounter = (encounter) => (dispatch, getState) => {
  axios
    .post("/api/encounters/", encounter, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addEncounter: "Encounter Added" }));
      dispatch({
        type: ADD_ENCOUNTER,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteEncounter = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/encounters/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteEncounter: "Encounter Deleted" }));
      dispatch({
        type: DELETE_ENCOUNTER,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateEncounter = (id, encounter) => (dispatch, getState) => {
  axios
    .patch(`/api/encounters/${id}/`, encounter, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updateEncounter: "Encounter Updated" }));
      dispatch({
        type: UPDATE_ENCOUNTER,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const selectEncounter = (id) => (dispatch, getState) => {
  if (id == null) {
    dispatch({
      type: SELECT_ENCOUNTER,
      payload: null,
    });
  } else {
    axios
      .get(`/api/encounters/${id}/select/`, tokenConfig(getState))
      .then((res) => {
        dispatch({ type: SELECT_ENCOUNTER, payload: res.data });
      })
      .catch((err) =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  }
};

export const runEncounter = (id) => (dispatch, getState) => {
  axios
    .get(`api/encounters/${id}/run/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: RUN_ENCOUNTER, payload: res.data });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const importAgent = (agent, encounterId) => (dispatch, getState) => {
  const importBody = JSON.stringify({ encounterId });

  axios
    .post(
      `/api/agents/${agent.id}/duplicate/`,
      importBody,
      tokenConfig(getState)
    )
    .then((res) => {
      if (agent.type == "character" || agent.type == "monster") {
        const agentId = res.data.id;
        const autoClusterBody = JSON.stringify({ agentId });
        axios
          .post(
            `/api/encounters/${encounterId}/auto_cluster/`,
            autoClusterBody,
            tokenConfig(getState)
          )
          .then((res) => {
            const agent = res.data["agent"];
            const cluster = res.data["cluster"];
            const action = res.data["action"];
            dispatch({
              type: TOGGLE_CLUSTER_MEMBERSHIP,
              payload: res.data,
            });
            dispatch(
              createMessage({
                clusterAgent: `${agent.name} has been ${action} the ${cluster.name} cluster`,
              })
            );
          })
          .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
          );
      }
      dispatch({
        type: IMPORT_AGENT,
        payload: res.data,
      });
      dispatch(createMessage({ importAgent: "Agent Imported" }));
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const clusterAgent = (id, agent, cluster) => (dispatch, getState) => {
  const body = JSON.stringify({ agent, cluster });

  axios
    .post(`/api/encounters/${id}/cluster_agent/`, body, tokenConfig(getState))
    .then((res) => {
      const agent = res.data["agent"];
      const cluster = res.data["cluster"];
      const action = res.data["action"];
      dispatch({
        type: TOGGLE_CLUSTER_MEMBERSHIP,
        payload: res.data,
      });
      dispatch(
        createMessage({
          clusterAgent: `An Agent has been ${action} the ${cluster.name} Cluster`,
        })
      );
    })
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
