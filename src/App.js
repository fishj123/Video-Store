import React, { Component } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./components/home";
import Movies from "./components/movies";
import Register from "./components/register";
import Login from "./components/login";
import MoviePage from "./components/moviePage";
import UserDashboard from "./components/userDashboard";
import auth, { getUserFromDb } from "./services/authService";
import Logout from "./components/logout";
import PageNotFound from "./components/404";
import Basket from "./components/basket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import http from "./services/httpService";

class App extends Component {
  state = {
    message: ""
  };

  async componentDidMount() {
    const user = await auth.getCurrentUser();
    this.setState({ user });
  }

  addToBasket = movie => {
    const basket = JSON.parse(sessionStorage.getItem("basket")) || [];
    basket.push(movie);
    this.setState({ basket });
    const sessionStorageData = JSON.stringify(basket);
    sessionStorage.setItem("basket", sessionStorageData);
    toast.success("Movie added to basket");
    console.log(this.state.basket);
  };

    removeItem = item => {
    const basket = JSON.parse(sessionStorage.getItem("basket"));
    const newBasket = basket.filter(movie => movie._id !== item._id);
    sessionStorage.setItem("basket", JSON.stringify(newBasket));
    this.forceUpdate();
  };

  handleRent = async movies => {
    let user = this.state.user;

    try {
      movies.forEach(movie => {
        // movie.copies--;
        const movieId = movie._id;
        http.put(
          "https://imbd-clone-api.herokuapp.com/api/users/rentals/" + user._id,
          { rentals: movieId }
        );
      });
      sessionStorage.removeItem("basket");
      toast.success("Movies rented!");
      this.setState({ message: "Thanks for your order!" });
    } catch (ex) {
      console.log(ex);
      toast.error("Oops, something went wrong...");
    }

  };

  render() {

    const basket = JSON.parse(sessionStorage.getItem("basket")) || [];

    const { user, message } = this.state;
    return (
      <div className="App">
        <ToastContainer />
        <NavBar user={user} basket={basket} />
        <main className="container-fluid">
          <Switch>
            <Route
              path="/movie/:title"
              render={props => (
                <MoviePage
                  {...props}
                  user={user}
                  addToBasket={this.addToBasket}
                />
              )}
            />
            <Route
              path="/basket"
              render={props => (
                <Basket
                  {...props}
                  items={this.state.basket}
                  user={this.state.user}
                  removeItem={this.removeItem}
                  handleRent={this.handleRent}
                  message={message}
                />
              )}
            />
            <Route path="/catalogue" component={Movies} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route
              path="/me"
              render={props => <UserDashboard {...props} user={user} />}
            />
            <Route path="/" exact component={Home} />
            <Route path="/" component={PageNotFound} />
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
