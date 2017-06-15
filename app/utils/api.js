var axios = require('axios');
axios.defaults.baseURL = 'https://graph.facebook.com/v2.9';
var eventsNumber = 4;
//var fbat = '';

function fbLogin () {
  FB.login(function(response) {
    //fbat = response.authResponse.accessToken;
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
     });
    } else {
     console.log('User cancelled login or did not fully authorize.');
    }
  });
}

function fbEvents () {
  FB.api('/153549318022206/events', {limit: eventsNumber, since: '1493596800'}, function(response) {

    //sort id of last 4 events into an array
    let idArray = [];
    for (let i=0; i < eventsNumber; i++) {
      idArray.push(response.data[i].id);
    }

    return response;
  });
}

function axEvents () {
  axios.get('/153549318022206/events', {
    params: {
      limit: eventsNumber,
      since: '1493596800',
      access_token: fbat
    }
  })
    .then(function (events) {
      let idArray = [];
      for (let i=0; i < eventsNumber; i++) {
        idArray.push(events.data.data[i].id);
      }
      return {
        eventsArray: idArray
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

module.exports = {
  loginUser: (fbLogin),
  fetchEvents: function() {
    return fbEvents()
  },
  axFetchEvents: function() {
    return axEvents()
  }
}
