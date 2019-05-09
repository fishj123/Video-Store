import React, { Component } from 'react';

class Login extends Component {
    state = {  }
    render() { 
        return (
        <form className="mt-3">
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control" placeholder="Enter email"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="form-control" placeholder="Enter password"/>
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
        </form>
)
    }
}
 
export default Login;