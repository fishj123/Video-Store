import React, { Component } from "react";

class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="hero col-md-6">
            <h1>Video Store</h1>
          </div>
          <div className="col-md-6 how-it-works">
            <h3>How it works</h3>
            <p>1. Sign up for an account</p>
            <p>2. Browse our movie collection</p>
            <p>3. Rent the movies you want to see</p>
            <p>
              4. You're given <b>unlimited</b> access to the movie
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
