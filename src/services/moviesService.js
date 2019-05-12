import http from './httpService';


export function getMovies() {
    return http.get("https://imbd-clone-api.herokuapp.com/api/movies")
}

