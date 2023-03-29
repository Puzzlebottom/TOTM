import { SET_ACTIVE_NAVLINK } from "../actions/types";

const initialState = {
  activeLink: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_NAVLINK:
      return {
        ...state,
        activeLink: action.payload,
      };
    default:
      return state;
  }
}
