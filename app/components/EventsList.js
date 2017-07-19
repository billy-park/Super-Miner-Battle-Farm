var React = require('react');
var PropTypes = require('prop-types');
var axios = require('axios');
var api = require('../utils/api');

class Event extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      attendingStatus: null
    }
    this.changeStateAttending = this.changeStateAttending.bind(this);
    this.changeStateInterested = this.changeStateInterested.bind(this);
    this.changeStateDeclined = this.changeStateDeclined.bind(this);
  }
  componentDidMount() {
    var status = "error";
    api.fbEventAttendingCheck(this.props.eventId)
    .then(function(response) {
      //console.log("big", response);
      if (response === 'going') {
        status = 'You are ' + response + ' to this event';
      } else if (response === 'interested') {
        status = 'You are ' + response + ' in this event';
      } else if (response === 'not going') {
        status = 'You are not ' + response + ' to this event';
      }
      this.setState(function () {
        return {
          attendingStatus: status
        }
      }.bind(this));
      //console.log(this.state.attendingStatus);
    }.bind(this));
  }

  changeStateAttending() {
    this.setState(function () { return { attendingStatus: "You are going to this event" }});
    api.fbAttendEvent(this.props.eventId);
  }
  changeStateInterested() {
    this.setState(function () { return { attendingStatus: "You are interested in this event" }});
    api.fbInteresedEvent(this.props.eventId);
  }
  changeStateDeclined() {
    this.setState(function () { return { attendingStatus: "You are not going to this event" }});
    api.fbDeclineEvent(this.props.eventId);
  }
  //var attendingStatus = api.fbEventAttendingCheckTest(props.eventId);
  //console.log(attendingStatus);
  render() {
  return (
    <div className='event'>
        <div className='eventWrap'>
          <p>{this.props.eventName}</p>
          <a href={'https://www.facebook.com/' + this.props.eventId}>
            <img src={this.props.eventCover}></img>
          </a>
          <p>{this.props.eventDate}</p>
          <p>{this.state.attendingStatus}</p>
          <button className='eventButton' onClick={this.changeStateAttending.bind(this)}>Going</button>
          <button className='eventButton' onClick={this.changeStateInterested.bind(this)}>Interested</button>
          <button className='eventButton' onClick={this.changeStateDeclined.bind(this)}>Not Going</button>
        </div>
    </div>
  )
}
}

class EventsList extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      eventsObjState: null
    }

    this.eventFetcher = this.eventFetcher.bind(this);
    this.testBind = this.testBind.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }

  eventFetcher() {
    console.log("ef");
    api.fetchEventsTest()
    .then(function(events) {
      console.log(events);
      this.setState(function () {
        return {
          //possible to sort by date?
          eventsObjState: events
        }
      }.bind(this));
    }.bind(this));
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
updatePage() {
  this.forceUpdate();
}
testBind(response) {
  console.log("TESTBIND");
  if (response.status === 'connected') {
    console.log("ef");
    api.fetchEventsTest()
    .then(function(events) {
      events.reverse();
      //console.log(events);
      this.setState(function () {
        return {
          //possible to sort by date?
          eventsObjState: events
        }
      }.bind(this));
    }.bind(this));
    this.forceUpdate();
  } else {
    console.log("not connected");
  }
}

    /*api.fbLoginStatus(function(response) {
      console.log(response, "nice");
      if (response.status === 'connected') {
        console.log("tassty fam");
      } else {
        console.log("busted init");
      }
        this.eventFetcher();
    });*/


  render() {
    return (
      <div className='eventList'>
        <h1>List of upcoming SMBF Events!</h1>
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

module.exports = EventsList;
