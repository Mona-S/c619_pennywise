import React from 'react';

export default function Header(props) {
  return (

    <React.Fragment>
      <nav className="header">
        <img
          className="home-button"
          onClick={() => props.setView('home', {})}
          src="/assets/home.png"
          alt="home button"></img>
        <span
          className="header-title"
          onClick={() => props.setView('home', {})}>PennyWise</span>
      </nav>

    </React.Fragment>
  );
}
