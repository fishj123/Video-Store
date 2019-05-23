import React, { Component } from "react";
import { NavLink } from "react-router-dom";


class NavBar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <NavLink className="navbar-brand" to="/">
          Video Store
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse"  id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
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
