import http from './httpService';

const apiEndpoint = process.env.REACT_APP_VIDEO_STORE_API_URL + "movies/"


function movieUrl(id) {
    return `${apiEndpoint}${id}`
}

export function getMovies() {
    return http.get(apiEndpoint)
}

export function saveMovie(movie) {
    if (movie._id) {
        const body = { ...movie };
        delete body._id;
        return http.put(movieUrl(movie._id), body);
    }

    return http.post(apiEndpoint, movie);
}


