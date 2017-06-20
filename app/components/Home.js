var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var PropTypes = require('prop-types');
var axios = require('axios');
//components
var api = require('../utils/api');

class Home extends React.Component {
  constructor (props) {
    super (props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='content'>
        <h1>
          Super Miner Battle Farm
        </h1>
        <p>
          Super Miner Battle Farm is a community of fighting game players based in South West England and Wales. We are a friendly and welcoming group of people with a good sense of humour and a desire to improve and support the offline scene in the UK. We host weekly sessions and monthly tournaments in Bristol, as well as other events in the Wales area.

If you're interested, please join our group page for more information on our events, tournaments we've gone to and any other fighting game news and videos our members post.
        </p>
      </div>
    )
  }

}

module.exports = Home;
