import http from "./httpService";

const apiEndpoint = process.env.REACT_APP_VIDEO_STORE_API_URL + "genres/"

export function getGenres() {
    return http.get(apiEndpoint)
}

