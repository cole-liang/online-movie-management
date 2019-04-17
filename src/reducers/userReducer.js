import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_USER_SUCCESS:
      return { ...state, jwt: action.jwt };

    case types.REGISTER_USER_FAIL:
      return { ...state, error: action.error };

    case types.LOAD_USER:
      return { ...state, user: action.user };

    case types.LOGIN_USER_SUCCESS:
      return state;

    case types.LOGIN_USER_FAIL:
      return { ...state, error: action.error };

    case types.LOGIN_USER_WITH_JWT:
      return state;

    case types.RESET_USER_ERROR:
      return { ...state, error: null };

    case types.LOGOUT_USER:
      return state;

    default:
      return state;
  }
};

export default userReducer;
