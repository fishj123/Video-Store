import React from "react";

const MoviesPagination = props => {

    const { getPagesCount, handlePageChange, currentPage } = props;
    if (!getPagesCount()) return null;
  return (
      
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        
          {getPagesCount().map(page => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              onClick={() => handlePageChange(page)}
            >
              <a className="page-link">
                {page}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default MoviesPagination;
