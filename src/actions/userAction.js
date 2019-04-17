import * as types from "./actionTypes";
import * as userAPI from "../services/userService";
import * as authAPI from "../services/authService";

export const registerUser = user => {
  return async dispatch => {
    try {
      const response = await userAPI.register(user);
      const jwt = response.headers["x-auth-token"];
      return dispatch(registerUserSuccess(jwt));
    } catch (error) {
      return dispatch(registerUserFail(error));
    }
  };
};

export const loadUser = () => {
  const user = authAPI.getCurrentUser();
  return { type: types.LOAD_USER, user };
};

export const loginUser = user => {
  return async dispatch => {
    try {
      await authAPI.login(user);
      return dispatch(loginUserSuccess(user));
    } catch (error) {
      return dispatch(loginUserFail(error));
    }
  };
};

export const loginUserWithJwt = jwt => {
  authAPI.loginWithJwt(jwt);
  return { type: types.LOGIN_USER_WITH_JWT };
};

export const logoutUser = () => {
  authAPI.logout();
  return { type: types.LOGOUT_USER };
};

export const resetUserError = () => ({
  type: types.RESET_USER_ERROR
});

const registerUserSuccess = jwt => ({
  type: types.REGISTER_USER_SUCCESS,
  jwt
});

const registerUserFail = error => ({
  type: types.REGISTER_USER_FAIL,
  error
});

const loginUserSuccess = () => ({
  type: types.LOGIN_USER_SUCCESS
});

const loginUserFail = error => ({
  type: types.LOGIN_USER_FAIL,
  error
});
