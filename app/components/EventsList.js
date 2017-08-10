var React = require('react');
var PropTypes = require('prop-types');
var axios = require('axios');
var moment = require('moment');

//components
var api = require('../utils/api');

class Event extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      attendingStatus: null,
    }

    this.removeHighlight = this.removeHighlight.bind(this);
    this.changeStateAttending = this.changeStateAttending.bind(this);
    this.changeStateInterested = this.changeStateInterested.bind(this);
    this.changeStateDeclined = this.changeStateDeclined.bind(this);
  }

  componentDidMount() {
    //check if user is going to events and update button focus and relevant text
    var status = "error";
    api.fbEventAttendingCheck(this.props.eventId)
    .then(function(response) {
      if (response === 'going') {
        status = 'You are ' + response + ' to this event';
        this.refs.goButton.classList.add('buttonHighlight');
      } else if (response === 'interested') {
        status = 'You are ' + response + ' in this event';
        this.refs.inButton.classList.add('buttonHighlight');
      } else if (response === 'not going') {
        status = 'You are not ' + response + ' to this event';
        this.refs.noButton.classList.add('buttonHighlight');
      }
      this.setState(function () {
        return {
          attendingStatus: status,
        }
      }.bind(this));
    }.bind(this));
  }

  //remove highlight class from buttons when not needed
  removeHighlight() {
    this.refs.goButton.classList.remove('buttonHighlight');
    this.refs.inButton.classList.remove('buttonHighlight');
    this.refs.noButton.classList.remove('buttonHighlight');
  }

  //set user as going to event and update relevant text
  changeStateAttending() {
    this.removeHighlight();
    this.setState(function () { return { attendingStatus: "You are going to this event" }});
    api.fbAttendEvent(this.props.eventId);
  }

  //set user as interested in event and update relevant text
  changeStateInterested() {
    this.removeHighlight();
    this.setState(function () { return { attendingStatus: "You are interested in this event" }});
    api.fbInteresedEvent(this.props.eventId);
  }

  //set user as not going to event and update relevant text
  changeStateDeclined() {
    this.removeHighlight();
    this.setState(function () { return { attendingStatus: "You are not going to this event" }});
    api.fbDeclineEvent(this.props.eventId);
  }

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
  }

  componentDidMount() {
    //ensure user is logged in to facebook
    setTimeout(function() {
      if (typeof(FB) != 'undefined'
       && FB != null ) {
         FB.getLoginStatus(function(response) {
           this.populateEvents(response);
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
            this.populateEvents(response);
          }.bind(this));
        }.bind(this);
      }
    }.bind(this), 50);
  }

  //fetch and populate state with event data
  populateEvents(response) {
    if (response.status === 'connected') {
      api.fetchEvents()
      .then(function(events) {
        events.reverse();
        this.setState(function () {
          return {
            eventsObjState: events
          }
        }.bind(this));
      }.bind(this));
    } else {
      console.log("not connected");
    }
  }

  render() {
    return (
      <div className='eventList'>
        <h1>Upcoming SMBF Events</h1>
        {!this.state.eventsObjState
          ? <p>Please log in to Facebook to view the list of upcoming events</p>
          : this.state.eventsObjState.length === 0
            ? <p>There are currently no upcoming SMBF events, please check again soon or join the
              <a className='lower' href='https://www.facebook.com/groups/superminerbattlefarm'> SMBF Facebook Group</a> for updates</p>
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
