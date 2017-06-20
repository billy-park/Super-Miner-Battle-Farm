var React = require('react');
var PropTypes = require('prop-types');
var axios = require('axios');
var api = require('../utils/api');

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
      eventsObjState: null
    }

    this.eventFetcher = this.eventFetcher.bind(this);
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
    console.log("mounted");
    FB.getLoginStatus(function(response) {
      console.log(response, "test");
      if (response.status === 'connected') {
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
      } else {
        console.log("not connected");
      }
    }.bind(this));
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
