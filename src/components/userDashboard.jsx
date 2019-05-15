import React, { Component } from "react";
import auth from '../services/authService';

class UserDashboard extends Component {
  state = {
    user: {}
  };


  async componentDidMount() {
    const dbUser = await auth.getUserFromDb()
    if (!dbUser) return;
    this.setState({ user: dbUser.data[0] })
  }

  render() {
    const { user } = this.state;
    console.log(user.name)
    return (
        
      <React.Fragment>
        <h3>Dashboard - {user.name}</h3>
      </React.Fragment>
    );
  }
}

export default UserDashboard;
