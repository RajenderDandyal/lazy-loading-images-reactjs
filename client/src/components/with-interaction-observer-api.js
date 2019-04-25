import React, {Component} from 'react';
import {users} from "../utils/apiRequest";

class WithInteractionApi extends Component {
  state = {
    pageNo: 1,
    users: null
  };
  getUsers = async () => {
    let usersData = await users(this.state.pageNo);
    console.log(usersData)
    this.setState({user: usersData.results})
  };

  componentDidMount() {
    this.getUsers()
  }

  render() {
    return (
        <div>
          WithInteractionApi
        </div>
    );
  }
}

export default WithInteractionApi;