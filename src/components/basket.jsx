import React, { Component } from "react";

class Basket extends Component {
  state = {};
  render() {
    return (
      <div className="content-container">
        <h3>Basket</h3>
        <div className="basket-tile">
           <div className="basket-item">
                <p>This is a movie</p>
           </div>
        </div>

        <button className="btn btn-success" id="purchase">
            Purchase
        </button>
      </div>
    );
  }
}

export default Basket;
