import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_USER_SUCCESS:

    case types.LOAD_USER:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
