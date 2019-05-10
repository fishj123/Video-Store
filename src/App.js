import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import Movies from "./components/movies";
import Register from "./components/register";
import Login from "./components/login";
import Logout from "./components/logout";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <NavBar />
        <main className="container-fluid">
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/catalogue" component={Movies} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
