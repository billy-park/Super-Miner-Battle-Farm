var React = require('react');
var NavLink = require('react-router-dom').NavLink;

function Nav () {
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
    </ul>
  )
}

module.exports = Nav;
