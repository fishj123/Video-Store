import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import slugify from "slugify";
import http from "../services/httpService";
import MovieForm from './movieForm';

class UserDashboard extends Component {
  state = {
    user: {},
  };

  async componentDidMount() {
    const dbUser = await auth.getUserFromDb();
    if (!dbUser) return;
    this.setState({ user: dbUser.data[0] });
  }

  handleMovieSubmit = (e) => {
    e.preventDefault()
    console.log("submited")
  }

  render() {
    const { user } = this.state;
    if (!user.name) return null;

    return (
      <div className="content-container">
        <div className="row">
          <section className="col-md-12 col-xl-3 dash-column-left">
            <h3>My Rentals</h3>
            <ul className="list-group">
              {user.rentals.map(movie => (
                <li key={movie._id} className="list-group-item">
                  {movie.name}
                </li>
              ))}
            </ul>
          </section>
          <section className="col-md-12 col-xl-9" style={{minHeight: "70vh"}}>

          {user.isAdmin && <section>
            <h3>Admin Dashboard - {user.name}</h3>
            <div className="movie-form-container">
           < MovieForm />
            </div>
            </section>}

            {!user.isAdmin && <section>
              <h3>User Dashboard - {user.name}</h3>
              <p style={{width: "60%", margin: "auto"}}>You do not have admin rights therefore you cannot upload new movies to the database. If you think you should have admin rights please email us at <a href="mailto:thisemailisfake@gmail.com">ThisEmailIsFake@gmail.com</a></p>
            </section>}


          </section>
        </div>
      </div>
    );
  }
}

export default UserDashboard;
