import React from 'react';

const GenresList = ({ genres, currentGenre, selectGenre }) => {

    return ( 
        <ul class="list-group" style={{ cursor: "pointer" }}>
            {genres.map(g => (
                <li
                    className={
                        currentGenre === g.name
                            ? "list-group-item active"
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