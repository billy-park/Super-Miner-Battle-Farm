var React = require('react');
var PropTypes = require('prop-types');
var Api = require('../utils/api');

class EventsList extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      //api call to facebook returning events
      eventName: '',
      eventURL: ''
    }

  }

  render () {
    return (
      <div>
        {/* map over events and create a list ?? */}
        <p>
          hello world
        </p>
      </div>
    )
  }
}

EventsList.PropTypes = {
  eventName: PropTypes.string.isRequired,
  eventURL: PropTypes.string.isRequired
}

module.exports = EventsList;
