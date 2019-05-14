import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import * as userService from "../services/userService";

class Register extends Form {
  state = {
    data: {
      name: "",
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      // get the jwt from the response header
      auth.loginWithJwt(response.headers["x-auth-token"]);
      // redirect to home page on login
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="user-form-container">
        <div className="user-form">
          <h3>Register</h3>
          <form className="mt-3 input" onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("username", "Email", "email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
