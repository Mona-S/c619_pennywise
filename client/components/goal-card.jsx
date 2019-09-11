import React from 'react';

export default function GoalCard(props) {
  return (
    <React.Fragment>
      <div className="container">

        <div className={`goal-card ${props.color} `}>
          <span className="goal-card-title">{props.name}</span>
          <span className="daily-goal">{props.dailyGoal}</span>
        </div>

      </div>
    </React.Fragment>
  );
}
