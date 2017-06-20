var axios = require('axios');

//Facebook api
axios.defaults.baseURL = 'https://graph.facebook.com/v2.9';
var accessToken = null;

//check login status
function fbLoginStatus() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
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
