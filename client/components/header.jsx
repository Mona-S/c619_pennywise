import React from 'react';

export default function Header(props) {
  return (
    <React.Fragment>

      <nav className="header">
        <img className="home-button" src="/assets/home.png" alt="home button"></img>
        <span className="header-title">PennyWise</span>
      </nav>

    </React.Fragment>
  );
}
