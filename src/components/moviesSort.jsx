import React, { Component } from "react";
import Form from "./common/form";
class Sort extends Form {
  state = {};

  render() {

    const { handleSort } = this.props;

    return (
      <div>
            <div className="form-group mt-3 order-by">
                <label htmlFor="sort">Order By</label>
                <select name="sort" id="sort" className="form-control" onChange={(e) => handleSort(e.target.value)}>
                    <option value="asc">A-Z</option>
                    <option value ="desc">Z-A</option>
                </select>
            </div>
      </div>
    );
  }
}

export default Sort;
