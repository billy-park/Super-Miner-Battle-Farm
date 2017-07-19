var axios = require('axios');
var React = require('react');

//Facebook api
axios.defaults.baseURL = 'https://graph.facebook.com/v2.9';
var accessToken = null;

//check login status
function fbLoginStatus() {
  FB.getLoginStatus(function(response) {
    console.log("nice", response);
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
}

//fetch events
function fbFetchEvents() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      console.log("connected");
      accessToken = response.authResponse.accessToken
      let currentTime = Math.floor(Date.now() / 1000 - 1000);
      axios.get('/153549318022206/events', {
        params: {
        limit: 4,
        fields: 'name,cover,start_time',
        since: currentTime,
        access_token: accessToken
        }
      })
      .then(function(events) {
        //console.log(events);
        return events.data.data;
      });
    } else if (response.status === 'unknown') {
      console.log("unkown");
    } else if (response.status === 'not_authorized') {
      console.log("not authorized");
    }
  })
}

function fbFetchAlbum() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      console.log("connected");
      accessToken = response.authResponse.accessToken
      console.log("tasty");
      axios.get('/632698586773941/photos', {
        params: {
        access_token: accessToken
        }
      })
      .then(function(pics) {
        console.log(pics);
        return pics;
      });
    } else if (response.status === 'unknown') {
      console.log("unkown");
    } else if (response.status === 'not_authorized') {
      console.log("not authorized");
    }
  })

}

function fbAttendEvent(eventId) {
//  FB.api('/' + eventId + '/attending', 'post')
}
/*function fbFetchPics(pictures) {
  console.log("yummy");
  for (let i=0; i < pictures.length; i++) {
    axios.get('/' + pictures.data.data[i].id, {
      params: {
        access_token: accessToken
      }
    })
    .then(function(images) {
      console.log(images);
    })
  }
}*/

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
  fbFetchEvents: function() {
    fbFetchEvents();
  },
  /*fbEventAttendingCheck: function(eventId) {
    FB.api('/me', function(response) {
      let usersName = response.name;
      FB.api('/' + eventId + '/attending', function(attendees) {
        for (let i=0; i < attendees.data.length; i++) {
          if (attendees.data[i].name === usersName) {
            console.log("attending event");
            return "going";
          }// else if
        }
      })
    })
  },*/
  fbEventAttendingCheck: function(eventId) {
    return axios.get('https://graph.facebook.com/v2.9/me?fields=' + '&access_token=' + accessToken)
    .then(function(response) {
      let usersName = response.data.name;
      let userId = response.data.id;
      //console.log("me", response);
      return axios.get('https://graph.facebook.com/v2.9/' + eventId + '/attending/' + userId + '?fields=' + '&access_token=' + accessToken)
      .then(function(attendStatus) {
        //console.log("attend", attendStatus);
        if (attendStatus.data.data[0] != null) {
          if (attendStatus.data.data[0].rsvp_status === "attending") {
            //console.log("attending event");
            return "going";
          }
        } else {
          return axios.get('https://graph.facebook.com/v2.9/' + eventId + '/maybe/' + userId + '?fields=' + '&access_token=' + accessToken)
          .then(function(maybeStatus) {
            //console.log("maybe", maybeStatus);
            if (maybeStatus.data.data[0] != null) {
              if (maybeStatus.data.data[0].rsvp_status === "unsure") {
                //console.log("interested in event");
                return "interested";
              }
            } else {
              //console.log("not going");
              return "not going";
            }
          })
        }
      })
    })
  },
  /*fbEventAttendingCheck: function(eventId) {
    return axios.get('https://graph.facebook.com/v2.9/me?fields=' + '&access_token=' + accessToken)
    .then(function(response) {
      let usersName = response.data.name;
      console.log("me", response);
      return axios.get('https://graph.facebook.com/v2.9/' + eventId + '/attending?fields=' + '&access_token=' + accessToken)
      .then(function(attendees) {
        console.log(attendees);
        for (let i=0; i < attendees.data.data.length; i++) {
          if (attendees.data.data[i].name === usersName) {
            console.log("attending event");
            return "going";
          }
        }
      })
      return axios.get('https://graph.facebook.com/v2.9/' + eventId + '/maybe?fields=' + '&access_token=' + accessToken)
      .then(function(interestees) {
        console.log(interestees);
        for (let i=0; i < interestees.data.data.length; i++) {
          if (interestees.data.data[i].name === usersName) {
            console.log("interested in event");
            return "interested";
          }
        }
      })
      return axios.get('https://graph.facebook.com/v2.9/' + eventId + '/declined?fields=' + '&access_token=' + accessToken)
      .then(function(declinees) {
        console.log("declined = ", declinees);
        for (let i=0; i < declinees.data.data.length; i++) {
          if (declinees.data.data[i].name === usersName) {
            console.log("declined event");
            return "not going";
          }
        }
      })
    })
  }, */
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
    //console.log("11111111111");
  },
  fbInteresedEvent: function(eventId) {
    FB.api('/' + eventId + '/maybe', 'post')
  },
  fbDeclineEvent: function(eventId) {
    FB.api('/' + eventId + '/declined', 'post')
  },
  fetchEventsTest: function () {
    FB.getLoginStatus(function(response) {
      accessToken = response.authResponse.accessToken;
    });
    let currentTime = Math.floor(Date.now() / 1000 - 1000);
    return axios.get('https://graph.facebook.com/v2.9/153549318022206/events?fields=name%2Ccover%2Cstart_time&limit=4&since=' + currentTime + '&access_token=' + accessToken)
    .then(function(events) {
      console.log(events);
      return events.data.data;
    });
  },
  fetchAlbumTest: function() {
    //fbFetchAlbum();
    FB.getLoginStatus(function(response) {
      accessToken = response.authResponse.accessToken;
    });
    return axios.get('https://graph.facebook.com/v2.9/632698586773941/photos?fields=images' + '&access_token=' + accessToken)
    .then(function(pics) {
      console.log(pics);
      return pics.data.data;
    });
  }
  /*battle: function(players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
  fetchPopularRepos: function (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

     return axios.get(encodedURI)
      .then(function(response) {
       return response.data.items;
     });
  }*/
}
