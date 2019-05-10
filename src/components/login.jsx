import React, { Component } from "react";
import Joi from "joi-browser";
import auth from "../services/authService";

class Login extends Component {
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

  handleLogin = e => {
    e.preventDefault();
    const errors = this.validate();
    // if errors is empty set to an empty object instead of null
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doLogin();
  };

  validate = () => {
    // abortEarly: false will make Joi show all errors rather than just the first error
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    console.log(errors);
    return errors;
  };

  doLogin = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      // redirect to movies page and reload application
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


    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
    };

    // destructure input object to get input.name and input.value
    validateProperty = ({ name, value }) => {
        // whatever name is at runtime will be set as the key to this obj
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

  render() {
      const { data, errors } = this.state;
    return (
      <form className="mt-3" onSubmit={this.handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            onChange={this.handleChange}
            name="username"
            value={data["username"]}
            label={"Email"}
            error={errors["username"]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter password"
            onChange={this.handleChange}
            name="password"
            value={data["password"]}
            label={"Password"}
            error={errors["password"]}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    );
  }
}

export default Login;
