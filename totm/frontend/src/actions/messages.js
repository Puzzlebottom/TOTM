import { CREATE_MESSAGE, CREATE_REMINDER, GET_ERRORS } from "./types";
import { TOGGLE_IN_GAME } from "./types";

export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};

export const createReminder = (reminder) => {
  return {
    type: CREATE_REMINDER,
    payload: reminder,
  };
};

export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};

export const toggleInGame = () => {
  return {
    type: TOGGLE_IN_GAME,
    payload: {},
  };
};
