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
    //ensure user is logged in to facebook
    setTimeout(function() {
      if (typeof(FB) != 'undefined'
       && FB != null ) {
         FB.getLoginStatus(function(response) {
           this.populateAlbum(response);
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
          });
          FB.getLoginStatus(function(response) {
            this.populateAlbum(response);
          }.bind(this));
        }.bind(this);
      }
    }.bind(this), 100);
  }

  //fetch and populate state with pictures
  populateAlbum(response) {
    if (response.status === 'connected') {
      api.fetchAlbum()
      .then(function(pics) {
        this.setState(function () {
          return {
            picsObjState: pics
          }
        }.bind(this));
      }.bind(this));
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
            ? <p>Please log in to Facebook to view the gallery</p>
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
