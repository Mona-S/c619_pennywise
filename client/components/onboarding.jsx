import React from 'react';

function Onboarding(props) {
  return (
    <React.Fragment>
      <div className="onBoarding">
        <p className="someStatement">Save More Buy More.</p>

        <p className="secondStatement"> Save Money for the things you want</p>

        <p className="getStartedNow">Get Started Now</p>

        <div className="getStartedButton"
          onClick={() => props.setView('creategoal', {})}> <p>Get Started</p> </div>
      </div>
    </React.Fragment>
  );

}

export default Onboarding;
