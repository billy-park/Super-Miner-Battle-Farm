var React = require('react');
var NavLink = require('react-router-dom').NavLink;

//components
var api = require('../utils/api');

//images
import logo from '../images/logo.png';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.userName,
      login: null
    }
  };

  render() {
    return (
      <div>
        <ul className='nav'>
          <li>

          </li>
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
          {/*<li className='logoLi'><img className='logo' src='/app/images/logo.png'></img></li>*/}
          <li className='logoLi'><img className='logo' src={logo}></img></li>
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
          <li>
            <div className="fbButton">
              <div className="fb-login-button" data-max-rows="1" data-size="medium" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true" data-scope="rsvp_event" data-onLogin="location.reload();"></div>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

module.exports = Nav;
