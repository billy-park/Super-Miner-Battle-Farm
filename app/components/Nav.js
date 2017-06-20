import React from 'react';
var NavLink = require('react-router-dom').NavLink;

import {autorun, observable} from 'mobx';
import {observer} from 'mobx-react';
var api = require('../utils/api');

function LoginButton(props) {
  //console.log(props.status);
  if (props.status === 'connected') {
    return (
      <a href='#' onClick={props.logoutFunc}>Logout</a>
    )
  } else if (props.status === 'not_authorized') {
    return (
      <p>not authorized</p>
    )
  } else if (props.status === 'unknown') {
    return (
      <a href='#' onClick={api.fbLogin}>Login</a>
    )
  } else {
    return(
      <p>error</p>
    )
  }
}

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: this.props.userName,
      login: null
    }
    this.statusTest = this.statusTest.bind(this);
  };

  componentDidMount() {
    FB.getLoginStatus(function(response) {
      
    })
  }

  statusTest() {
    console.log(this.state.login);
    console.log(this.state.userName);
  }

  render() {
    return (
      <ul className='nav'>
        <li>
          <NavLink exact activeClassName='active' to='/'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='active' to='/events'>
            Events
          </NavLink>
        </li>
        <img className='logo' src='../logo.png'></img>
        <li>
          <NavLink activeClassName='active' to='/placeholder'>
            Placeholder
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='active' to='/contact'>
            Find Us
          </NavLink>
        </li>
        <li>
          <LoginButton
            status={this.props.loginStatus}
            loginFunc={this.props.loginFunction}
            logoutFunc={this.props.logoutFunction}
          />
        </li>
        <li>
          <a href='#' onClick={api.fbLogin}>Login</a>
        </li>
        <li>
          <a href='#' onClick={api.fbLoginStatus}>test events</a>
        </li>
      </ul>
    )
  }
}
module.exports = Nav;
