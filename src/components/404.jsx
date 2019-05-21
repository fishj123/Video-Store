import React from "react";
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <container className="page-not-found-container">
      <h1>404: Page not found...</h1>
      <Link to="/" className="btn btn-primary">Take me home</Link>
    </container>
  );
};

export default PageNotFound;
