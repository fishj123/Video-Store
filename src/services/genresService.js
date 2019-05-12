import http from "./httpService";

const genres = [
    {
        _id: "5cd4699a0cd89da5080fecad",
        name: "Horror",
    },
    {
        _id: "5cd46b980cd89da5080fecae",
        name: "Comedy",
    },
    {
        _id: "5cd46ba40cd89da5080fecaf",
        name: "Romance",
    },
    {
        _id: "5cd46baa0cd89da5080fecb0",
        name: "Action",
    },
    {
        _id: "5cd46bb40cd89da5080fecb1",
        name: "Sci-Fi",
    },
    {
        _id: "5cd46be30cd89da5080fecb2",
        name: "Thriller",
    }
]

export function getGenres() {
    return http.get("https://imbd-clone-api.herokuapp.com/api/genres")
}

