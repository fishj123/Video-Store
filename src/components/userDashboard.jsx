import React, { Component } from "react";
import auth from "../services/authService";
import { getUserRentals } from "../services/moviesService";
import MovieForm from "./movieForm";

class UserDashboard extends Component {
  state = {
    user: {},
  };

  async componentDidMount() {
    const dbUser = await auth.getUserFromDb();
    if (!dbUser) return;
    this.setState({ user: dbUser.data[0] });
    this.calculateDailyCharge();
  }

  handleMovieSubmit = e => {
    e.preventDefault();
    console.log("submited");
  };

  handleRemoveRent = movie => {
    let user = this.state.user;
    user.rentals = user.rentals.filter(item => item._id !== movie._id);
    this.setState({ user });
    this.props.removeRent(movie);
    this.calculateDailyCharge();
  };

  async calculateDailyCharge() {
    const { user } = this.state;
    let sum = 0;
    try {
      const rentals = await getUserRentals(user);

      for (const array of rentals) {
        sum += parseInt(array.rentalCost);
      }
      this.setState({ rent: sum });
    } catch (ex) {
      console.log(ex);
      return 1;
    }
  }

  render() {
    const { user } = this.state;
    if (!user.name)
      return (
        <div className="content-container">
          {" "}
          <React.Fragment>
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border" role="status">
                <span className="sr-only" />
              </div>
            </div>
            <p className="mt-3">Loading Dashboard, please wait...</p>
          </React.Fragment>
        </div>
      );

    return (
      <div className="content-container">
        <div className="row">
          <section className="col-md-12 col-xl-3 dash-column-left">
            <h3>My Rentals</h3>
            <table className="table">
              <tr>
                <th>Movie</th>
                <th>Stop Renting</th>
              </tr>
              {user.rentals.map(movie => (
                <tr>
                  <td>{movie.name}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleRemoveRent(movie)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </section>
          <section className="col-md-12 col-xl-9" style={{ minHeight: "70vh" }}>
            {user.isAdmin && (
              <section>
                <h3>Admin Dashboard - {user.name}</h3>
                <div className="movie-form-container">
                  <MovieForm />
                </div>
              </section>
            )}

            {!user.isAdmin && (
              <section>
                <h3>User Dashboard - {user.name}</h3>
                <p style={{ width: "60%", margin: "auto" }}>
                  You do not have admin rights therefore you cannot upload new
                  movies to the database. If you think you should have admin
                  rights please email us at{" "}
                  <a href="mailto:thisemailisfake@gmail.com">
                    ThisEmailIsFake@gmail.com
                  </a>
                </p>
              </section>
            )}
            <h4 className="mt-3 text-danger">
              Your current daily charge: £{this.state.rent}{" "}
            </h4>
          </section>
        </div>
      </div>
    );
  }
}

export default UserDashboard;
