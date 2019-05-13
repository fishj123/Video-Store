import React from 'react';

const GenresList = ({ genres, currentGenre, selectGenre }) => {

    return ( 
        <ul className="list-group" style={{ cursor: "pointer" }}>
            {genres.map(g => (
                <li
                    className={
                        currentGenre === g.name
                            ? "list-group-item my-active"
                            : "list-group-item"
                    }
                    onClick={() => selectGenre(g.name)}
                >
                    {g.name}
                </li>
            ))}
        </ul>
     );
}
 
export default GenresList;