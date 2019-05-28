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



  render() {
    const items = JSON.parse(localStorage.getItem("basket")) || [];
    const message = this.props.message;

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
                    onClick={() => this.props.removeItem(item)}
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
          onClick={() => this.props.handleRent(items)}
        >
          Purchase
        </button>
      </div>
    );
  }
}

export default Basket;
