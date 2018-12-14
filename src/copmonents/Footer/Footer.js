import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <footer className="row bg-dark p-3">
        <div className="col-3 p-0 text-light">
          <h6>Центр поддержки пользователей</h6>
          <h5>+375(44 | 29 | 25) 749-78-97</h5>
          <h6>(viber | telegram | skype)</h6>
          <h6>support@cars.by</h6>
        </div>
        <div className="col-9 p-0 text-light">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
