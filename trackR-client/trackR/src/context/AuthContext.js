import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const authReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const signUp = dispatch => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/sign-up", { email, password });
      console.log(response.data);
    } catch (err) {
      dispatch({
        type: "ADD_ERROR",
        payload: "Something went wrong with sign up."
      });
    }
  };
};

const signIn = dispatch => {
  return ({ email, password }) => {};
};

const signOut = dispatch => {
  return () => {};
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signOut, signUp },
  { isSignedIn: false, errorMessage: null }
);
