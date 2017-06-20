var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var PropTypes = require('prop-types');
var axios = require('axios');
//components
var Home = require('./Home');
var EventsList = require('./EventsList');
var Nav = require('./Nav');
var Contact = require('./Contact');
var api = require('../utils/api');
class App extends React.Component {
  constructor (props) {
    super (props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <div className='container'>
            <a href='#'>test state</a>
            <Nav
              //loginStatus={this.state.userLoginStatus}
              //loginFunction={this.handleLogin}
              //logoutFunction={this.handleLogout}
            />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/events' component={EventsList}/>
              {/*<Route exact path='/placeholder' component={Placeholder} example="exampleprop!"/> */}
              <Route exact path='/contact' component={Contact} />
            </Switch>
        </div>
      </Router>
    )
  }

}

module.exports = App;
