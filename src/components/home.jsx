import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-12 hero">
            <h1>Video Store</h1>
            <div className="hero-img-container">
              <img className="camera-img" src="/images/camera.png" alt="" />
            </div>
          </div>
          <div className="col-md-12 how-it-works">
            <h3>How it works</h3>
          </div>
          <div className="col-md-12 home-boxes-container">
            <div className="how-it-works-boxes">
              <p className="number">1</p> <p>Sign up for a user account</p>
            </div>
            <div className="how-it-works-boxes">
              <p className="number">2</p> <p>Browse our movie collection</p>
            </div>
            <div className="how-it-works-boxes">
              <p className="number">3</p> <p>Rent the movies you want to see</p>
            </div>
            <div className="how-it-works-boxes">
              <p className="number">4</p> <p>Return them when you're done</p>
            </div>
          </div>
          <div className="col-md-12 mb-5">
            <Link to="/catalogue" className="btn my-btn-primary">
              Start Browsing
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
