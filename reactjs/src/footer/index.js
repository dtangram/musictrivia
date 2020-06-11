import React from 'react';
import facebook from '../img/facebook.png';
import twitter from '../img/twitter.png';
import instagram from '../img/instagram.png';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <footer>
        <div>
          <p title="" />
          <div>
            <img src={facebook} alt="Music Trivia Facebook" />
            <img src={twitter} alt="Music Trivia Twitter" />
            <img src={instagram} alt="Music Trivia Instagram" />
          </div>
        </div>
        <ul>
          <li title="Help">Help</li>
          <p>|</p>
          <li title="Music Trivia Privacy Policy"> Privacy</li>
          <p>|</p>
          <li title="Music Trivia Terms of Use"> Terms of Use</li>
        </ul>
      </footer>
    );
  }
}

export default Footer;
