import React from "react";

// we use the spread operator to get the rest of the values from the props object
// I then insert this spread object into my input props to get value={value} onChange={onChange} type={type}
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
