var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var PropTypes = require('prop-types');
var axios = require('axios');
//components
var api = require('../utils/api');

class Contact extends React.Component {
  constructor (props) {
    super (props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='content'>
        <h1>
          Find us!
        </h1>
      </div>
    )
  }

}

module.exports = Contact;
