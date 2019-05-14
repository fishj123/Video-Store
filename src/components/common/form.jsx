import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from './select';

class Form extends Component {
    //   state = {
    //     data: {},
    //     errors: {},
    //   };

    validate = () => {
        // abortEarly: false will make Joi show all errors rather than just the first error
        const options = { abortEarly: false };
        const result = Joi.validate(this.state.data, this.schema, options);
        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details) errors[item.path[0]] = item.message;
        return errors;

    };

    // destructure input object to get input.name and input.value
    validateProperty = ({ name, value }) => {
        // whatever name is at runtime will be set as the key to this obj
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        // if errors is empty set to an empty object instead of null
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
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

    renderButton(label) {
        return (
            <button disabled={this.validate()} className="btn btn-primary">
                {label}
            </button>
        );
    }

    renderInput(name, label, type = "text") {
        const { data, errors } = this.state;
        return (
            <Input
                type={type}
                name={name}
                value={data[name]}
                label={label}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }

   renderSelect(name, label, options) {
        const { data, errors } = this.state;

        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }
}

export default Form;

