import React, { Component } from "react";
import http from "../services/httpService";
import { toast } from "react-toastify";

class Basket extends Component {
  state = {
    message: ""
  };

  totalPrice = items => {
    let total = 0;
    items.forEach(movie => {
      total += movie.rentalCost;
    });

    return total;
  };

  removeItem = item => {
    const basket = JSON.parse(localStorage.getItem("basket"));
    const newBasket = basket.filter(movie => movie._id !== item._id);
    localStorage.setItem("basket", JSON.stringify(newBasket));
    this.setState({ basket });
  };

  handleRent = async movies => {
    let user = this.props.user;

    try {
      movies.forEach(movie => {
        // movie.copies--;
        const movieId = movie._id;
        http.put(
          "https://imbd-clone-api.herokuapp.com/api/users/rentals/" + user._id,
          { rentals: movieId }
        );
      });
      localStorage.removeItem("basket");
      toast.success("Movies rented!");
      this.setState({ message: "Thanks for your order!" });
    } catch (ex) {
      console.log(ex);
      toast.error("Oops, something went wrong...");
    }

    // movie.copies--;
    // this.setState({ movie });

    // try {
    //   console.log(movie);
    //   let { user } = { ...this.state };
    //   console.log(user);

    //   const movieId = movie._id.trim();
    //   http.put(
    //     "https://imbd-clone-api.herokuapp.com/api/users/rentals/" + user._id,
    //     { rentals: movieId }
    //   );

    //   const { data: userDB } = await getUserFromDb();
    //   this.setState({ user: userDB[0] });
    //   toast.success("Movie rented!");
    // } catch (ex) {
    //   this.setState({ button: originalButton });
    //   toast.error("Oops, something went wrong :(");
    //   console.log(ex);
    // }
  };

  render() {
    const items = JSON.parse(localStorage.getItem("basket")) || [];
    const message = this.state.message;

    if (items.length === 0 && message.length > 0)
      return <h3 className="content-container">{message}</h3>;

    if (items.length === 0)
      return <h3 className="content-container">Basket empty</h3>;

    return (
      <div className="content-container">
        <h3>Basket</h3>
        <div className="basket-tile">
          <table className="table">
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th />
            </tr>
            {items.map(item => (
              <tr>
                <td>{item.title}</td>
                <td>£{item.rentalCost}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.removeItem(item)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <strong>TOTAL:</strong>
              </td>
              <td>
                <strong>£{this.totalPrice(items)}</strong>
              </td>
              <td />
            </tr>
          </table>
        </div>

        <button
          className="btn btn-success"
          id="purchase"
          onClick={() => this.handleRent(items)}
        >
          Purchase
        </button>
      </div>
    );
  }
}

export default Basket;
