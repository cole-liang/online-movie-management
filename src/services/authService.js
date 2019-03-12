import http from "./httpService";
import jwtDecode from "jwt-decode";

const authUrl = "/auth";
const tokenKey = "token";

http.setAuthToken(localStorage.getItem(tokenKey));

export async function login(user) {
  const { data: jwt } = await http.post(authUrl, {
    email: user.username,
    password: user.password
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser
};
