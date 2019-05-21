import http from './httpService';

const apiEndpoint = "https://imbd-clone-api.herokuapp.com/api/movies/"


function movieUrl(id) {
    return `${apiEndpoint}${id}`
}

export function getMovies() {
    return http.get("https://imbd-clone-api.herokuapp.com/api/movies")
}

export function saveMovie(movie) {
    if (movie._id) {
        const body = { ...movie };
        delete body._id;
        return http.put(movieUrl(movie._id), body);
    }

    return http.post("https://imbd-clone-api.herokuapp.com/api/movies", movie);
}


