import React, {Component} from 'react';

class UserCard extends Component {

  render() {
    let {user} = this.props;
    if (user){
      return (
          <div className={'userCard'}>
            <div className={'image'}>
              <img className={'lazy'} data-src={user.picture.large}/>
            </div>
            <div className={'details'}>
              <p>name: {user.name.first+ " "+ user.name.last}</p>
              <p>age: {user.dob.age}</p>
              <p>gender: {user.gender}</p>
            </div>
          </div>
      );
    } else return null

  }
}

export default UserCard;