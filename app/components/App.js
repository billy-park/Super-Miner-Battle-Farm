var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

//require other components here
var EventsList = require('./EventsList');
var Facebook = require('./Facebook');
var Nav = require('./Nav');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
            <Nav />
            <Switch>
              <Facebook />
              <EventsList />
            </Switch>
        </div>
      </Router>
    )
  }
}

/*class App extends React.Component {
  render() {
    return(
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route path='/popular' component={Popular} />
            <Route render={function () {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}
*/
module.exports = App;
