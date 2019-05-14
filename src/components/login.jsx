import React from "react";
import Joi from "joi-browser";
import auth from "../services/authService";
import Form from "./common/form";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      // redirect to home page and reload application
      // if they are logging in after redirect from a protected route they are sent back to where they tried to access
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      console.log(ex);
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
          <h3>Login</h3>
          <form className="mt-3 input" onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Email", "email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
