import React, {Component} from 'react';
import {users} from "../utils/apiRequest";
import UserCard from "./UserCard";


class WithScrollEvents extends Component {
  state = {
    pageNo: 1,
    users: null,
    loading: false,
    lazyloadImages: null
  };
  getUsers = async () => {
    this.setState({loading: true})
    let usersData = await users(this.state.pageNo);
    console.log(usersData)
    if (usersData) {
      this.setState({
        users: this.state.users ? [...this.state.users, ...usersData.results] : [...usersData.results],
        loading: false,
      }, () => this.runLazyLoadImages())
    }

  };
  loadMore = (e) => {
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    // console.log(scrollHeight, window.pageYOffset)
    if ((scrollHeight - window.scrollY) < (window.innerHeight / 1000 + window.innerHeight)) {
    /*if (window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight) {*/
      this.setState({pageNo: this.state.pageNo + 1}, () => this.getUsers())

    }
  }
  infiniteScroll = () => {
    document.addEventListener('scroll', this.loadMore)
  }
  lazyload = () => {
    let lazyloadThrottleTimeout
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }

    lazyloadThrottleTimeout = setTimeout(() => {
      // get scroled out part of document
      var scrollTop = window.pageYOffset;

      // then check if image is in visible part of screen then .. replace data-src with src attribute
      if (this.state.lazyloadImages) {
        this.state.lazyloadImages.forEach(function (img) {
          //if(img.offsetTop < (window.innerHeight + scrollTop)) {
          if (img.getBoundingClientRect().top > 0 && img.getBoundingClientRect().top < window.innerHeight) {
            //console.log(img.offsetTop, (window.innerHeight + scrollTop))
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('imageTag');
          }

        });
        if (this.state.lazyloadImages.length == 0) {
          document.removeEventListener("scroll", this.lazyload);
          window.removeEventListener("resize", this.lazyload);
          window.removeEventListener("orientationChange", this.lazyload);
        }
      }

    }, 20);
  }
  runLazyLoadImages = () => {
    console.log('runn8ing')
    // get all images with class "lazy"
    var lazyloadImages = document.querySelectorAll("img.lazy");
    console.log(lazyloadImages)
    var lazyloadThrottleTimeout;
    this.setState({lazyloadImages})


// to load images on visible part of screen on the first run
    this.lazyload()
    // then run lazyload() on these events
    document.addEventListener("scroll", this.lazyload);
    window.addEventListener("resize", this.lazyload);
    window.addEventListener("orientationChange", this.lazyload);

// remove them when the component will unmount
  }

  componentDidMount() {
    this.getUsers()
    this.infiniteScroll()
    this.runLazyLoadImages()
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.loadMore)
    document.removeEventListener("scroll", this.lazyload);
    window.removeEventListener("resize", this.lazyload);
    window.removeEventListener("orientationChange", this.lazyload);
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
          <div>{this.state.loading ? <p align="center">Loading more... wait :) </p> : null}</div>
        </div>
    );
  }
}

export default WithScrollEvents;