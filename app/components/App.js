var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

//components
var Home = require('./Home');
var EventsList = require('./EventsList');
var Nav = require('./Nav');
var Contact = require('./Contact');
var Gallery = require('./Gallery');
var api = require('../utils/api');

class App extends React.Component {
  constructor (props) {
    super (props);
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId            : '341972936221944',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.9'
        });
      FB.AppEvents.logPageView();
    }.bind(this);
  }

  render() {
    return (
      <Router>
        <div className='container'>
            <Nav />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/events' component={EventsList} />
              <Route exact path='/gallery' component={Gallery} />
              <Route exact path='/contact' component={Contact} />
            </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App;
