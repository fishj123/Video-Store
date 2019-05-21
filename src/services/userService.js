import http from "./httpService";

const apiEndpoint = process.env.REACT_APP_VIDEO_STORE_API_URL + "users"

export function register(user) {
    return http.post(apiEndpoint, {
        name: user.name,
        email: user.username,
        password: user.password,
    })
}