var React = require('react');
var PropTypes = require('prop-types');
var axios = require('axios');

window.fbAsyncInit = function() {
  FB.init({
    appId            : '341972936221944',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.9'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

var fbat = '';
axios.defaults.baseURL = 'https://graph.facebook.com/v2.9';

function Event(props) {
  return (
    <div className='event'>
      <a href={'https://www.facebook.com/' + props.eventId}>
        <div className='eventWrap'>
          <p>{props.eventName}</p>
          <img src={props.eventCover}></img>
          <p>{props.eventDate}</p>
        </div>
      </a>
    </div>
  )
}

class EventsList extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      //set default state !!!!!
      eventsObjState: null
    }
    this.axFindEvents = this.axFindEvents.bind(this);
  }


  //need to add support for figuring out number of events
  axFindEvents() {
    let currentTime = Math.floor(Date.now() / 1000 - 1000);
    FB.login(function(response) {
      fbat = response.authResponse.accessToken;
      if (response.authResponse) {
       console.log('Welcome!  Fetching your information.... ');
       axios.get('/me', {
         params: {
           access_token: fbat
         }
       })
       .then(function(me) {
         axios.get('/153549318022206/events', {
           params: {
             limit: 4,
             fields: 'name,cover,start_time',
             since: currentTime,
             access_token: fbat
           }
         })
           .then(function (events) {
             var numberOfEvents = events.data.data.length;
             var eventsObj = [];
             for (let i=0; i < numberOfEvents; i++) {
               eventsObj.push(events.data.data[i]);
             }
             this.setState(function () {
               return {
                 //possible to sort by date?
                 eventsObjState: eventsObj
               }
             }.bind(this))
           }.bind(this))
           .catch(function(error) {
             console.log(error);
           });
       }.bind(this))
       FB.api('/me', function(response) {
         console.log('Good to see you, ' + response.name + '.');
      });
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
    }.bind(this))

  }
  render () {
    return (
        <div className='eventList'>
          <a href='#' onClick={this.axFindEvents}>Login</a>
          {!this.state.eventsObjState
            ? <p>Please log in to facebook to view list of upcoming events</p>
            : this.state.eventsObjState.map(function(event, y) {
            return (
              <Event
                key={y}
                eventId={event.id}
                eventName={event.name}
                eventCover={event.cover.source}
                eventDate={event.start_time}
              />
            )
          })}
        </div>
    )
  }
}

/*EventsList.PropTypes = {
  eventName: PropTypes.string.isRequired,
  eventURL: PropTypes.string.isRequired
}*/

module.exports = EventsList;
