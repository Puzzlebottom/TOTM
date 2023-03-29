import { SET_ACTIVE_NAVLINK } from "./types";

export const setActiveNavlink = (link) => (dispatch) => {
  dispatch({ type: SET_ACTIVE_NAVLINK, payload: link });
};
