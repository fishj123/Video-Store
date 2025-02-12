import http from "./httpService";

const apiEndpoint = process.env.REACT_APP_VIDEO_STORE_API_URL + "movies/";

function movieUrl(id) {
  return `${apiEndpoint}${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(id) {
  return http.get(apiEndpoint + id);
}

export function startRent(user, movieId) {
  http.put(
    "https://imbd-clone-api.herokuapp.com/api/users/rentals/" + user._id,
    { rentals: movieId }
  );
}

export function stopRent(user, movieId) {
  http.put(
    "https://imbd-clone-api.herokuapp.com/api/users/remove-rental/" + user._id,
    {
      rentals: movieId,
    }
  );
}

export async function getUserRentals(user) {
  const userRentals = [];

  for (const movie of user.rentals) {
    const { data } = await getMovie(movie._id);
    userRentals.push(data[0]);
  }
  return userRentals;
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(apiEndpoint, movie);
}
