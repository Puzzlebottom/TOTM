import {
  CREATE_MESSAGE,
  CREATE_REMINDER,
  TOGGLE_IN_GAME,
} from "../actions/types";

const initialState = {
  message: null,
  reminder: null,
  inGame: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return { ...state, message: action.payload };
    case CREATE_REMINDER:
      return { ...state, reminder: action.payload };
    case TOGGLE_IN_GAME:
      return {
        ...state,
        inGame: !state.inGame,
      };
    default:
      return state;
  }
}
