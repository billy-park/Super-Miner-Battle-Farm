import React from 'react';
var NavLink = require('react-router-dom').NavLink;

import {autorun, observable} from 'mobx';
import {observer} from 'mobx-react';
var api = require('../utils/api');

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: this.props.userName,
      login: null
    }
    this.statusTest = this.statusTest.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
  };

  componentDidMount() {

  }
  checkLoginState() {
    api.fbLoginStatus();
  }
  statusTest() {
    console.log(this.state.login);
    console.log(this.state.userName);
  }

  render() {
    return (
      <div>
        <ul className='nav'>
          <li>
            <NavLink exact className='navbarLink' activeClassName='active' to='/'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className='navbarLink' activeClassName='active' to='/events'>
              Events
            </NavLink>
          </li>
          <li className='logoLi'><img className='logo' src='../logo.png'></img></li>
          {/*<li>
            <NavLink activeClassName='active' to='/placeholder'>
              Placeholder
            </NavLink>
          </li>*/}
          <li>
            <NavLink className='navbarLink' activeClassName='active' to='/gallery'>
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink className='navbarLink' activeClassName='active' to='/contact'>
              Find Us
            </NavLink>
          </li>
        </ul>
        <div className="fbButton">
          <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true" data-scope="rsvp_event" data-onLogin="location.reload();"></div>
        </div>
      </div>
    )
  }
}
module.exports = Nav;
