var React = require('react');

class Facebook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgURL: 'https://www.bbcgoodfood.com/sites/default/files/glossary/banana-crop.jpg'
    }
      this.apiTestThree = this.apiTestThree.bind(this);
  }



  apiTest() {
    FB.login(function(response) {
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

  apiTestTwo() {
    FB.api('/153549318022206/events', {limit: '4', since: '1493596800'}, function(response) {
      console.log(response);
    });
  }

  //could probably use promises
  apiTestThree() {
    FB.api('/1843506619244679', {fields: 'cover'}, function(response) {
      this.setState(function () {
        return {
          imgURL: response.cover.source
        }
      })
    }.bind(this))
  }
  render () {
    return (
      <div>
        <a href='#' onClick={this.apiTest}>Login</a>
        <br />
        <br />
        <a href='#' onClick={this.apiTestTwo}>Test</a>
        <br />
        <br />
        <a href='#' onClick={this.apiTestThree}>Testevent</a>
        <img src={this.state.imgURL} />
      </div>
    )
  }
}


module.exports = Facebook;
