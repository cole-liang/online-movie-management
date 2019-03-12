import http from "./httpService";

const usersUrl = "/users";

export async function register(user) {
  return await http.post(usersUrl, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
