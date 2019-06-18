import React, { Component } from "react";
import _ from "lodash";

class MoviesPagination extends Component {
  getPagesCount = () => {
    const { movies, itemsPerPage } = this.props;
    if (!movies) return;
    const pagesCount = Math.ceil(movies.length / itemsPerPage);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    return pages;
  };

  render() {
    const { handlePageChange, currentPage } = this.props;
    if (!this.getPagesCount()) return null;

    return (
      <nav aria-label="Page navigation" role="pagination">
        <ul className="pagination" style={{ cursor: "pointer" }}>
          {this.getPagesCount().map(page => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              onClick={() => handlePageChange(page)}
            >
              <span className="page-link">{page}</span>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default MoviesPagination;
