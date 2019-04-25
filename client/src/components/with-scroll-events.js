import React, {Component} from 'react';
import {users} from "../utils/apiRequest";
import UserCard from "./UserCard";
import {runLazyLoadImages} from "../utils/eventListners";

class WithScrollEvents extends Component {
  state = {
    pageNo: 1,
    users: null
  };
  getUsers = async () => {
    let usersData = await users(this.state.pageNo);
    console.log(usersData.results)

    this.setState({users:this.state.users?[ ...this.state.users, ...usersData.results]:[...usersData.results]}, () => runLazyLoadImages())
  };
  infiniteScroll = () => {

  	document.addEventListener('scroll',()=>{
      let scrollHeight = Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
      );
      console.log(scrollHeight, window.pageYOffset)
      if ((scrollHeight - window.scrollY)<700){
        this.setState({pageNo:this.state.pageNo+1}, ()=>this.getUsers())
      }
    })


  }

  componentDidMount() {
    this.getUsers()
    this.infiniteScroll()
  }

  render() {
    console.log(this.state)
    return (
        <div className={'container'}>
          <h1 align="center">With Scroll, Resize, Orientation change events and infinite scroll</h1>
          <div className={'userContainer'}>
            {this.state.users ? this.state.users.map(user => <UserCard user={user}/>) :
                <p align="center">Loaading...</p>}
          </div>

        </div>
    );
  }
}

export default WithScrollEvents;