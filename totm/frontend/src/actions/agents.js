import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_AGENTS,
  ADD_AGENT,
  DELETE_AGENT,
  UPDATE_AGENT,
  SELECT_AGENT,
  ACTIVATE_AGENT,
} from "./types";

export const getAgents = () => (dispatch, getState) => {
  axios
    .get("/api/agents/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_AGENTS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addAgent = (agent) => (dispatch, getState) => {
  axios
    .post("/api/agents/", agent, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addAgent: "Agent Added" }));
      dispatch({
        type: ADD_AGENT,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteAgent = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/agents/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteAgent: "Agent Deleted" }));
      dispatch({
        type: DELETE_AGENT,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateAgent = (id, data) => (dispatch, getState) => {
  axios
    .patch(`/api/agents/${id}/`, data, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updateAgent: "Agent Updated" }));
      dispatch({
        type: UPDATE_AGENT,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const selectAgent = (id) => (dispatch, getState) => {
  if (id == null) {
    dispatch({
      type: SELECT_AGENT,
      payload: null,
    });
  } else {
    axios
      .get(`/api/agents/${id}/select/`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: SELECT_AGENT,
          payload: res.data,
        });
      });
  }
};

export const activateAgent = (id) => (dispatch, getState) => {
  if (id == null) {
    dispatch({
      type: ACTIVATE_AGENT,
      payload: null,
    });
  } else {
    axios
      .get(`/api/agents/${id}/select/`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: ACTIVATE_AGENT,
          payload: res.data,
        });
      });
  }
};
