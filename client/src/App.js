import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import Home from "./components/Home";
import WithInteractionApi from "./components/with-interaction-observer-api";
import WithScrollEvents from "./components/with-scroll-events";

class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path={'/with-interaction-observer-api'} component={WithInteractionApi}/>
          <Route exact path={'/with-scroll-events'} component={WithScrollEvents}/>
          <Route exact path={'/'} component={Home}/>
        </Switch>
    );
  }
}

export default withRouter(App);
