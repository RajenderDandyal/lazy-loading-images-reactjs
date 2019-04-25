import React, {Component} from 'react';
import {users} from "../utils/apiRequest";
import UserCard from "./UserCard";


class WithInteractionApi extends Component {
  state = {
    pageNo: 1,
    users: null
  };
  getUsers = async () => {
    let usersData = await users(this.state.pageNo);
    console.log(usersData.results)
    this.setState({users: usersData.results})
  };

  componentDidMount() {
    this.getUsers()
  }

  render() {
    return (
        <div className={'container'}>
          <h1 align="center">With Scroll, Resize, Orientation change events</h1>
          <div className={'userContainer'}>
            {this.state.users?this.state.users.map(user=><UserCard user={user}/>):<p align="center">Loaading...</p>}
          </div>

        </div>
    );
  }
}

export default WithInteractionApi;