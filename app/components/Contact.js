var React = require('react');

//components
var api = require('../utils/api');

class Contact extends React.Component {
  constructor (props) {
    super (props);
  }

  render() {
    return (
      <div className='content'>
        <h1>
          Where to Find Us
        </h1>
        <p>SMBF hosts weekly fighting games sessions at The Lanes in the heart of Bristol</p>
        <h4>Find SMBF on Facebook: <a className='lower' href='https://www.facebook.com/groups/superminerbattlefarm'>SMBF Facebook Group</a></h4>
        {/*<h4>The Lanes: </h4>*/}
        <iframe className='lanesMap' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.0921359910867!2d-2.5956680838966575!3d51.45646477962669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48718e770a0919b1%3A0xb47ee7f35f7d627f!2sThe+Lanes!5e0!3m2!1sen!2suk!4v1499360320977"
         width="600" height="450" frameBorder="0" allowFullScreen></iframe>
      </div>
    )
  }
}

module.exports = Contact;
