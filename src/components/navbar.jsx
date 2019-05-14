import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import authService from "../services/authService";

class NavBar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <NavLink className="navbar-brand" to="/">
          Video Store
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/catalogue">
                Catalogue
              </NavLink>
            </li>
            <li className="nav-item">
              {!user && (
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {!user && (
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {user && (
                <NavLink className="nav-link" to="/me">
                  {user.name}
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {user && (
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
