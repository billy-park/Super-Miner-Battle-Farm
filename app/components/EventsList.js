var React = require('react');
var PropTypes = require('prop-types');
var axios = require('axios');
var api = require('../utils/api');
var moment = require('moment');

class Event extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      attendingStatus: null,
      //buttonStatus: null
    }
    this.removeHighlight = this.removeHighlight.bind(this);
    this.changeStateAttending = this.changeStateAttending.bind(this);
    this.changeStateInterested = this.changeStateInterested.bind(this);
    this.changeStateDeclined = this.changeStateDeclined.bind(this);
  }
  componentDidMount() {
    var status = "error";
    var btnStatus = "";
    api.fbEventAttendingCheck(this.props.eventId)
    .then(function(response) {
      //console.log("big", response);
      if (response === 'going') {
        status = 'You are ' + response + ' to this event';
        //document.getElementById("notGoingButton").classList.remove('buttonHighlight');
        //document.getElementById("interestedButton").classList.remove('buttonHighlight');
        //document.getElementById("goingButton").classList.add('buttonHighlight');
        //btnStatus = "goingButton"
        //console.log("testtest");
        this.refs.goButton.classList.add('buttonHighlight');
      } else if (response === 'interested') {
        status = 'You are ' + response + ' in this event';
        //document.getElementById("notGoingButton").classList.remove('buttonHighlight');
        //document.getElementById("goingButton").classList.remove('buttonHighlight');
        //document.getElementById("interestedButton").classList.add('buttonHighlight');
        this.refs.inButton.classList.add('buttonHighlight');
      } else if (response === 'not going') {
        status = 'You are not ' + response + ' to this event';
        //document.getElementById("goingButton").classList.remove('buttonHighlight');
        //document.getElementById("interestedButton").classList.remove('buttonHighlight');
        //document.getElementById("notGoingButton").classList.add('buttonHighlight');
        this.refs.noButton.classList.add('buttonHighlight');
      }
      this.setState(function () {
        return {
          attendingStatus: status,
          //buttonStatus: btnStatus
        }
      }.bind(this));
      //document.getElementById(this.state.buttonStatus).focus();
      //console.log(this.state.attendingStatus);
    }.bind(this));
  }

  removeHighlight() {
    this.refs.goButton.classList.remove('buttonHighlight');
    this.refs.inButton.classList.remove('buttonHighlight');
    this.refs.noButton.classList.remove('buttonHighlight');
  }

  changeStateAttending() {
    this.removeHighlight();
    this.setState(function () { return { attendingStatus: "You are going to this event" }});
    api.fbAttendEvent(this.props.eventId);
  }
  changeStateInterested() {
    this.removeHighlight();
    this.setState(function () { return { attendingStatus: "You are interested in this event" }});
    api.fbInteresedEvent(this.props.eventId);
  }
  changeStateDeclined() {
    this.removeHighlight();
    this.setState(function () { return { attendingStatus: "You are not going to this event" }});
    api.fbDeclineEvent(this.props.eventId);
  }
  //var attendingStatus = api.fbEventAttendingCheckTest(props.eventId);
  //console.log(attendingStatus);
  render() {
  return (
    <div className='event'>
        <div className='eventWrap'>
          <p className='eventName'>{this.props.eventName}</p>
          <p className='eventDate'>{this.props.eventDate}</p>
          <a href={'https://www.facebook.com/' + this.props.eventId}>
            <img src={this.props.eventCover}></img>
          </a>
          <p className='eventAttendingStatus'>{this.state.attendingStatus}</p>
          <button id='goingButton' className='eventButton' ref='goButton' onClick={this.changeStateAttending.bind(this)}>Going</button>
          <button id='interestedButton' className='eventButton' ref='inButton' onClick={this.changeStateInterested.bind(this)}>Interested</button>
          <button id='notGoingButton' className='eventButton' ref='noButton' onClick={this.changeStateDeclined.bind(this)}>Not Going</button>
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
        <h1>Upcoming SMBF Events</h1>
        {!this.state.eventsObjState
          ? <p>Please log in to facebook to view list of upcoming events</p>
          : this.state.eventsObjState.map(function(event, y) {
            var date_parsed = moment(event.start_time, "YYYY-MM-DD hh:mm Z");
            var thisEventDate = date_parsed.format('MMMM Do, h:mm:ss a');
          return (
            <Event
              key={y}
              eventId={event.id}
              eventName={event.name}
              eventCover={event.cover.source}
              eventDate={thisEventDate}
            />
          )
        })}
      </div>
    )
  }
}

module.exports = EventsList;
