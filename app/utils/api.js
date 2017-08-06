var axios = require('axios');
var React = require('react');

//Facebook api
axios.defaults.baseURL = 'https://graph.facebook.com/v2.9';
var accessToken = null;

//check login status
function fbLoginStatus() {
  FB.getLoginStatus(function(response) {
  });
}

//login
function fbLogin() {
  FB.login(function(response) {
    if (response.status === 'connected') {
      console.log("logged in");
      accessToken = response.authResponse.accessToken
    } else {
      console.log("unable to login");
    }
  });
}

//logout
function fbLogout() {
  FB.logout();
  console.log("logged out");
}

module.exports = {
  fbLoginStatus: function() {
    fbLoginStatus();
  },
  fbLogin: function() {
    fbLogin();
  },
  fbLogout: function() {
    fbLogout();
  },
  fbEventAttendingCheck: function(eventId) {
    return axios.get('https://graph.facebook.com/v2.9/me?fields=' + '&access_token=' + accessToken)
    .then(function(response) {
      let usersName = response.data.name;
      let userId = response.data.id;
      return axios.get('https://graph.facebook.com/v2.9/' + eventId + '/attending/' + userId + '?fields=' + '&access_token=' + accessToken)
      .then(function(attendStatus) {
        if (attendStatus.data.data[0] != null) {
          if (attendStatus.data.data[0].rsvp_status === "attending") {
            return "going";
          }
        } else {
          return axios.get('https://graph.facebook.com/v2.9/' + eventId + '/maybe/' + userId + '?fields=' + '&access_token=' + accessToken)
          .then(function(maybeStatus) {
            if (maybeStatus.data.data[0] != null) {
              if (maybeStatus.data.data[0].rsvp_status === "unsure") {
                return "interested";
              }
            } else {
              return "not going";
            }
          })
        }
      })
    })
  },
  fbEventAttending: function(eventId) {
    FB.api('/' + eventId + '/attending')
  },
  fbEventInterested: function(eventId) {
    FB.api('/' + eventId + '/interested')
  },
  fbEventDeclined: function(eventId) {
    FB.api('/' + eventId + '/declined')
  },
  fbAttendEvent: function(eventId) {
    FB.api('/' + eventId + '/attending', 'post')
  },
  fbInteresedEvent: function(eventId) {
    FB.api('/' + eventId + '/maybe', 'post')
  },
  fbDeclineEvent: function(eventId) {
    FB.api('/' + eventId + '/declined', 'post')
  },
  fetchEvents: function () {
    FB.getLoginStatus(function(response) {
      accessToken = response.authResponse.accessToken;
    });
    let currentTime = Math.floor(Date.now() / 1000 - 1000);
    return axios.get('https://graph.facebook.com/v2.9/153549318022206/events?fields=name%2Ccover%2Cstart_time&limit=4&since=' + currentTime + '&access_token=' + accessToken)
    .then(function(events) {
      return events.data.data;
    });
  },
  fetchAlbum: function() {
    FB.getLoginStatus(function(response) {
      accessToken = response.authResponse.accessToken;
    });
    return axios.get('https://graph.facebook.com/v2.9/1538242692886188/photos?fields=images' + '&access_token=' + accessToken)
    .then(function(pics) {
      return pics.data.data;
    });
  }
}
