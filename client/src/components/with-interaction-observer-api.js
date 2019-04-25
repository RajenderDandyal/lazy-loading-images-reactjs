import React, {Component} from 'react';
import {users} from "../utils/apiRequest";
import UserCard from "./UserCard";


class WithInteractionApi extends Component {
  state = {
    pageNo: 1,
    users: null
  };

  render() {
    return (
        <div className={'container'}>
          <h1 align="center">With Scroll, Resize, Orientation change events</h1>
          <div className={'userContainer'}>

          </div>

        </div>
    );
  }
}

export default WithInteractionApi;