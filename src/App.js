import React, { Component } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./components/home";
import Movies from "./components/movies";
import Register from "./components/register";
import Login from "./components/login";
import MoviePage from './components/moviePage';
import UserDashboard from './components/userDashboard';
import auth from './services/authService';
import Logout from "./components/logout";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <NavBar user={user}/>
        <main className="container-fluid">
          <Switch>
            <Route path="/movie/:title" render={props => <MoviePage {...props} user={user} />} />
            <Route path="/catalogue" component={Movies} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/me" render={props => <UserDashboard {...props} user={user} />} />
            <Route path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
