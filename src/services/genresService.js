import http from "./httpService";

export function getGenres() {
    return http.get("https://imbd-clone-api.herokuapp.com/api/genres")
}

