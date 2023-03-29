import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_CLUSTERS,
  ADD_CLUSTER,
  DELETE_CLUSTER,
  UPDATE_CLUSTER,
  SELECT_CLUSTER,
  QUICK_CLUSTER,
  GET_CLUSTER_AGENTS,
} from "./types";

export const getClusters = () => (dispatch, getState) => {
  axios
    .get("/api/clusters/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_CLUSTERS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addCluster = (cluster) => (dispatch, getState) => {
  axios
    .post("/api/clusters/", cluster, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addCluster: "Cluster Added" }));
      dispatch({
        type: ADD_CLUSTER,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteCluster = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/clusters/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteCluster: "Cluster Deleted" }));
      dispatch({
        type: DELETE_CLUSTER,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateCluster = (id, cluster) => (dispatch, getState) => {
  axios
    .patch(`/api/clusters/${id}/`, cluster, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updateCluster: "Cluster Updated" }));
      dispatch({
        type: UPDATE_CLUSTER,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const selectCluster = (id) => (dispatch, getState) => {
  if (id == null) {
    dispatch({
      type: SELECT_CLUSTER,
      payload: null,
    });
  } else {
    axios
      .get(`/api/clusters/${id}/select/`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: SELECT_CLUSTER,
          payload: res.data,
        });
      });
  }
};

export const createQuickCluster =
  (placeholderId, cluster) => (dispatch, getState) => {
    axios
      .post(
        `/api/clusters/${placeholderId}/substitute/`,
        cluster,
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch({
          type: QUICK_CLUSTER,
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

export const getClusterAgents = (clusterId) => (dispatch, getState) => {
  axios
    .get(`/api/clusters/${clusterId}/agents/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_CLUSTER_AGENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
