import React, {Component} from 'react';

import {Link} from 'react-router-dom';


class Home extends Component {

  render() {

    return (
        <div>
          <h1 align="center">lazy-loading-images:</h1>
          <div className={'links'}>
            <Link to={'/with-scroll-events'}>
              <h3>with scroll, resize, orientation change events</h3>
            </Link>
          </div>
          <div className={'links'}>
            <Link to={'/with-interaction-observer-api'}>
              <h3>with interaction observer api</h3>
            </Link>
          </div>
        </div>
    );
  }
}

export default Home;