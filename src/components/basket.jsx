import React, { Component } from "react";

class Basket extends Component {
state = {};


totalPrice = (items) => {
let total = 0;
items.forEach(movie => {
  total += movie.rentalCost
});

return total;
}

removeItem = (item) => {
const basket = JSON.parse(localStorage.getItem("basket"));
const newBasket = basket.filter(movie => movie._id !== item._id);
localStorage.setItem("basket", JSON.stringify(newBasket));
this.setState({basket});
}

  render() {
    const items = JSON.parse(localStorage.getItem("basket")) || [];

    if (items.length === 0) return <h3 className="content-container">Basket empty</h3>;

    return (
      <div className="content-container">
        <h3>Basket</h3>
        <div className="basket-tile">
          <table className="table">
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th></th>
            </tr>
            {items.map(item => (
              <tr>
                <td>{item.title}</td>
                <td>£{item.rentalCost}</td>
                <td><button className="btn btn-danger" onClick={() => this.removeItem(item)}>X</button></td>
              </tr>
            ))}
            <tr>
              <td><strong>TOTAL:</strong></td>
              <td><strong>£{this.totalPrice(items)}</strong></td>
              <td></td>
            </tr>
          </table>
        </div>

        <button className="btn btn-success" id="purchase">
          Purchase
        </button>
      </div>
    );
  }
}

export default Basket;
