import React, { Component } from "react";
import Form from "./common/form";
import Joi from 'joi-browser';
import { saveMovie } from '../services/moviesService';
import { toast } from "react-toastify";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      copies: "",
      rentalCost: "",
      image: "",
      synopsis: "",
    },
    errors: {},
  };

  schema = {
    title: Joi.string()
      .required().max(255)
      .label("Title"),
    genreId: Joi.string()
        .required().max(55)
      .label("Genre ID"),
    copies: Joi.number()
      .required().min(0).max(100)
      .label("Number in Stock"),
    rentalCost: Joi.number()
      .required().min(0).max(10)
      .label("Rental Cost"),
    image: Joi.string()
        .required().max(255)
      .label("Image"),
    synopsis: Joi.string()
        .required().max(1000)
      .label("Synopsis"),
  };

  doSubmit = async () => {
    console.log("Movie form submitted");
    try {

      await saveMovie(this.state.data);
      window.location = "/catalogue"
      toast.success("Movie added to the database!")
    } catch (ex) {
      toast.error("Oops, something went wrong :(")
      console.log(ex);
    }
  } 

  render() {
    console.log(this.props)
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("title", "Title")}
        {this.renderInput("genreId", "Genre")}
        {this.renderInput("copies", "Number in Stock")}
        {this.renderInput("rentalCost", "Rental Cost")}
        {this.renderInput("image", "Image")}
        {this.renderInput("synopsis", "Synopsis")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default MovieForm;
