var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var PropTypes = require('prop-types');
var axios = require('axios');
//components
var api = require('../utils/api');

function Picture (props) {
  return (
      <div className='picture'>
          <div className='picWrap'>
            <img className='smbfPic' src={props.picSrc}></img>
          </div>
      </div>
  )
}

class Gallery extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      picsObjState: null
    }
  }

  componentDidMount() {
    setTimeout(function() {
      /*FB.Event.subscribe('auth.login', function(response) {
        console.log("nice");
        //this.updatePage();
      }.bind(this));*/
      console.log("mounted");
      if (typeof(FB) != 'undefined'
       && FB != null ) {
         FB.getLoginStatus(function(response) {
           console.log(response, "test");
           this.testBind(response);
         }.bind(this));
      } else {
        window.fbAsyncInit = function() {
          FB.init({
            appId            : '341972936221944',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.9'
            });
          FB.AppEvents.logPageView();
          FB.getLoginStatus(function(response) {
            console.log("nice", response);
          });
          FB.getLoginStatus(function(response) {
            console.log(response, "test");
            this.testBind(response);
          }.bind(this));
        }.bind(this);
      }
    }.bind(this), 100);
  }

  testBind(response) {
    console.log("TESTBIND");
    if (response.status === 'connected') {
      console.log("ef");
      api.fetchAlbumTest()
      .then(function(pics) {
        //pics.reverse();
        //console.log(events);
        this.setState(function () {
          return {
            //possible to sort by date?
            picsObjState: pics
          }
        }.bind(this));
      }.bind(this));
      this.forceUpdate();
    } else {
      console.log("not connected");
    }
  }

  render() {
    return (
      <div className='content'>
        <h1>SMBF Gallery</h1>
        <div className='galleryContainer'>
          {!this.state.picsObjState
            ? <p>Please log in to facebook to view the gallery</p>
            : this.state.picsObjState.map(function(pic, y) {
            return (
              <Picture
                key={y}
                picSrc={pic.images[3].source}
              />
            )
          })}
        </div>
      </div>
    )
  }

}

module.exports = Gallery;
