import React, {Component} from 'react';
import {users} from "../utils/apiRequest";
import UserCard from "./UserCard";
import {interactionApi} from "../utils/interactionApi";


class WithInteractionApi extends Component {
  state = {
    pageNo: 1,
    users: null,
    loading: false
  };
  getUsers = async () => {
    this.setState({loading: true})
    let usersData = await users(this.state.pageNo);
    console.log(usersData.results)

    this.setState({
      users: this.state.users ? [...this.state.users, ...usersData.results] : [...usersData.results],
      loading: false
    }, () => interactionApi())
  };
  infiniteScroll = () => {

    // Options
    let options = {
      root: null, // Page as root
      rootMargin: '0px',
      threshold: 1.0
    };
    // Create an observer
    this.observer = new IntersectionObserver(
        this.handleObserver.bind(this), //callback
        options
    );
    //Observ the `loadingRef`
    this.observer.observe(this.loadingRef);
  }
  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    console.log("y",y)
    this.setState({pageNo: this.state.pageNo + 1}, () => this.getUsers())
    // if (this.state.prevY > y) {
    //   this.setState({pageNo: this.state.pageNo + 1}, () => this.getUsers())
    // }
    this.setState({ prevY: y });
  }
  componentDidMount() {
    //this.getUsers()
    interactionApi()
    this.infiniteScroll()
  }

  componentWillUnmount() {
   // document.removeEventListener('scroll', this.loadMore)
  }

  render() {
    return (
        <div className={'container'}>
          <h1 align="center">With Intersection Observer Api and infinite scroll</h1>
          <div className={'userContainer'}>
            {this.state.users ? this.state.users.map(user => <UserCard key={new Date() + Math.random()} user={user}/>) :
                <p align="center">Loaading...</p>}
          </div>
          <div
              ref={loadingRef => (this.loadingRef = loadingRef)}
          >
            <span >Loading...</span>
          </div>
        </div>
    );
  }
}

export default WithInteractionApi;