import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";

const preloadedState = {};

const reducer = rootReducer;

const store = configureStore({
  reducer,
  devTools: true,
  preloadedState,
});

export default store;
