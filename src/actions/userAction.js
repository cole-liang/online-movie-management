import * as types from "./actionTypes";
import * as userAPI from "../services/userService";
import * as authAPI from "../services/authService";

export const registerUser = user => {
  return async dispatch => {
    try {
      await userAPI.register(user);
      return dispatch(registerUserSuccess(user));
    } catch (error) {
      throw error;
    }
  };
};

export const loadUser = () => {
  const user = authAPI.getCurrentUser();
  return { type: types.LOAD_USER, user };
};

const registerUserSuccess = user => ({
  type: types.REGISTER_USER_SUCCESS,
  user
});

const loginUserSuccess = () => ({});
const loginUserWithJwtSuccess = () => ({});
const logoutUserSuccess = () => ({});
