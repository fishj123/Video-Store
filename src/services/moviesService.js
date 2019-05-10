

const movies = [
    {
        _id: "5cd4870c173a902a2c4ac844",
        title: "Mrs Doubtfire",
        copies: 30,
        genre: {
            _id: "5cd46b980cd89da5080fecae",
            name: "Comedy"
        },
        rentalCost: 1.5,
    },
    {
        _id: "5cd48757173a902a2c4ac846",
        title: "The Martian",
        copies: 80,
        genre: {
            _id: "5cd46bb40cd89da5080fecb1",
            name: "Sci-Fi"
        },
        rentalCost: 7.5,
    },
    {
        _id: "5cd4877c173a902a2c4ac848",
        title: "Jaws",
        copies: 55,
        genre: {
            _id: "5cd46be30cd89da5080fecb2",
            name: "Thriller"
        },
        rentalCost: 4,
    },
    {
        _id: "5cd48a385f78510017ab509e",
        title: "Green Street",
        copies: 75,
        genre: {
            _id: "5cd46baa0cd89da5080fecb0",
            name: "Action"
        },
        rentalCost: 5,
    },
    {
        _id: "5cd57292668847001770c2a5",
        title: "Love Actually",
        copies: 52,
        genre: {
            _id: "5cd46ba40cd89da5080fecaf",
            name: "Romance"
        },
        rentalCost: 4,
    }
]

function getMovies() {
    return movies;
}

module.exports.getMovies = getMovies;