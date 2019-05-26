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
import PageNotFound from "./components/404";
import Basket from './components/basket';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


class App extends Component {
  state = {};

 async componentDidMount() {
    const user = await auth.getCurrentUser();
    this.setState({ user });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
      <ToastContainer />
        <NavBar user={user}/>
        <main className="container-fluid">
          <Switch>
            <Route path="/movie/:title" render={props => <MoviePage {...props} user={user} />} />
            <Route path="/basket" component={Basket} />
            <Route path="/catalogue" component={Movies} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/me" render={props => <UserDashboard {...props} user={user} />} />
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
