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
import auth from "./services/authService";
import Logout from "./components/logout";
import PageNotFound from "./components/404";
import Basket from "./components/basket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { stopRent, startRent } from "./services/moviesService";

class App extends Component {
  state = {};

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

    const basketNav = document.getElementById("basket-count");

    basketNav.setAttribute("class", "basket-animation");
    setTimeout(() => {
      basketNav.removeAttribute("class");
    }, 1500);

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
        startRent(user, movieId);
      });
      sessionStorage.removeItem("basket");
      this.forceUpdate();
      toast.success("Movies rented!");
    } catch (ex) {
      console.log(ex);
      toast.error("Oops, something went wrong...");
    }
  };

  removeRent = movie => {
    const user = this.state.user;
    try {
      const movieId = movie._id;
      stopRent(user, movieId);
      toast.success("Movie Returned");
    } catch (ex) {
      toast.error("Oops, something went wrong :(");
      console.log(ex);
    }
  };

  render() {
    const basket = JSON.parse(sessionStorage.getItem("basket")) || [];

    const { user } = this.state;
    return (
      <div className="App">
        <ToastContainer />
        <NavBar user={user} basket={basket} />
        <main data-testid="app" className="container-fluid">
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
                />
              )}
            />
            <Route path="/catalogue" component={Movies} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route
              path="/me"
              render={props => (
                <UserDashboard
                  {...props}
                  user={user}
                  removeRent={this.removeRent}
                />
              )}
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
