import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload };
    case "SIGN_IN":
      return { ...state, errorMessage: null, token: action.payload };
    case "CLEAR_ERROR_MESSAGE":
      return { ...state, errorMessage: null };
    default:
      return state;
  }
};

const signUp = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/sign-up", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "SIGN_IN", payload: response.data.token });
    navigate("TrackList");
  } catch (err) {
    dispatch({
      type: "ADD_ERROR",
      payload: `Something went wrong with sign up. ${err}`
    });
  }
};

const signIn = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/sign-in", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "SIGN_IN", payload: response.data.token });
    navigate("TrackList");
  } catch (err) {
    dispatch({
      type: "ADD_ERROR",
      payload: `Something went wrong with sign in. ${err}`
    });
  }
};

const signOut = dispatch => {
  return () => {};
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "CLEAR_ERROR_MESSAGE" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signOut, signUp, clearErrorMessage },
  { token: null, errorMessage: null }
);
