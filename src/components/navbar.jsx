import React, { Component } from "react";
import { NavLink } from "react-router-dom";


class NavBar extends Component {
  state = {};

toggleNav = () => {
  const burgerMenu = document.getElementById("burger");
  const navItems = document.querySelector(".navbar-links")

  if (navItems.hasAttribute("id")) {
    navItems.removeAttribute("id");
    return;
  }

  navItems.setAttribute("id", "display-menu");
  

}

  render() {
    const { user, basket } = this.props;
    return (
      <nav className="my-navbar">
        <NavLink className="navbar-logo" to="/">
          Video Store
        </NavLink>
          <ul className="navbar-links display-menu">
            <li >
              <NavLink className="my-nav-link" to="/" onClick={this.toggleNav}>
                Home
              </NavLink>
            </li>
            <li >
            <NavLink className="my-nav-link" to="/catalogue" onClick={this.toggleNav}>
                Catalogue
              </NavLink>
            </li>
            <li >
              {!user && (
              <NavLink className="my-nav-link" to="/register" onClick={this.toggleNav}>
                  Register
                </NavLink>
              )}
            </li>
            <li >
              {!user && (
              <NavLink className="my-nav-link" to="/login" onClick={this.toggleNav}>
                  Login
                </NavLink>
              )}
            </li>
            <li >
              {user && (
              <NavLink className="my-nav-link" to="/me" onClick={this.toggleNav}>
                  {user.name}
                </NavLink>
              )}
            </li>
          <li >
            {user && (
              <NavLink className="my-nav-link" to="/basket" onClick={this.toggleNav}>
                My Basket ({basket.length})
                </NavLink>
            )}
          </li>
            <li >
              {user && (
              <NavLink className="my-nav-link" to="/logout" onClick={this.toggleNav}>
                  Logout
                </NavLink>
              )}
            </li>
          </ul>

        <i className="fas fa-bars" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={this.toggleNav}></i>

      </nav>
    );
  }
}

export default NavBar;
