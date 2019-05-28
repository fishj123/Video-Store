import React, { Component } from "react";

class Basket extends Component {
  state = {};
  render() {

    const items = this.props.items;

    if(items.length === 0) return <h3>Basket empty</h3>

    return (
      <div className="content-container">
        <h3>Basket</h3>
        <div className="basket-tile">
        {items.map(item => 
          <div className="basket-item">
            <p>{item.title}</p>
            <p>{item.rentalCost}</p>
          </div>
          )}

        </div>

        <button className="btn btn-success" id="purchase">
            Purchase
        </button>
      </div>
    );
  }
}

export default Basket;
