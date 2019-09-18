import React from 'react';
import GoalCard from './goal-card';
import { dailyGoal, weeklyGoal, inDollars } from './helper.js';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      dailyGoalsTotal: ['dailyGoalsTotal'],
      weeklyGoalsTotal: []
    };

    this.colors = ['teal', 'pink', 'orange'];
  }

  componentDidMount() {
    this.getGoals();
  }

  getGoals() {
    fetch(`/api/goals.php`)
      .then(res => res.json())
      .then(response => this.setState({ goals: response }));
  }

  dailyGoalsTotal(i) {
    var dailyGoalsArray = [];
    for (i in this.state.goals) {
      dailyGoalsArray.push(dailyGoal(this.state.goals[i]));
    }
    return dailyGoalsArray.reduce((a, b) => a + b, 0);
  }

  weeklyGoalsTotal(i) {
    var weeklyGoalsArray = [];
    for (i in this.state.goals) {
      weeklyGoalsArray.push(weeklyGoal(this.state.goals[i]));
    }
    return weeklyGoalsArray.reduce((a, b) => a + b, 0);
  }

  generateCards() {
    const goalList = this.state.goals.map((goalData, index) => {
      return (
        <GoalCard
          key={goalData.goal_id}
          id={goalData.goal_id}
          name={goalData.goal_name}
          completionDate={goalData.goal_completion_date}
          // savingsTarget={goalData.savings_target}
          // currentSavings={getTotalSavings(goalData.transaction_history)}
          dailyGoal={inDollars(dailyGoal(goalData))}
          isCompleted={goalData.isCompleted}
          color={this.colors[index % this.colors.length]}
          setView={this.props.setView}
        />
      );

    });
    return goalList;
  }

  render() {
    return (
      <React.Fragment>

        {
          <div className="container">
            <div>{inDollars(this.dailyGoalsTotal())}</div>

            <div>{inDollars(this.weeklyGoalsTotal())}</div>
          </div>
        }
        <div
          className="new-goal-button"
          onClick={props =>
            this.props.setView('creategoal', { goal_id: props.id })}>
          <span className="new-goal-text">New Goal</span>
        </div>

        {this.generateCards()}

      </React.Fragment>
    );
  }
}
