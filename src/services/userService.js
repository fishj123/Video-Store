import http from "./httpService";

const apiEndpoint = "auth/users/";

export function register(user) {
    return http.post("https://imbd-clone-api.herokuapp.com/api/users", {
        name: user.name,
        email: user.username,
        password: user.password,
    })
}