import React from 'react';
import GoalCard from './goal-card';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      goals: [
        {
          goal_id: 1,
          goal_name: 'Purple Mattress',
          savings_target: 300000,
          goal_completion_date: '2019-09-30',
          current_savings: 10000,
          is_completed: 0
        },
        {
          goal_id: 2,
          goal_name: 'Alex\'s Disneyland Pass',
          savings_target: 30000,
          goal_completion_date: '2019-10-05',
          current_savings: 10000,
          is_completed: 0
        }

      ]
    };
    this.colors = ['teal', 'pink', 'orange'];
    this.differenceInDays = this.differenceInDays.bind(this);
    this.todaysDate = this.todaysDate.bind(this);
    this.dailyGoal = this.dailyGoal.bind(this);
    this.generateCards = this.generateCards.bind(this);

  }

  // componentDidMount() {

  // }

  // getGoals() {
  //   fetch(`/api/home.php`)
  //     .then(res => res.json())
  //     .then(response => this.setState({ goals: response }));
  // }

  generateCards() {
    const goalList = this.state.goals.map((goalData, index) => {
      return <GoalCard
        key={goalData.goal_id}
        id={goalData.goal_id}
        name={goalData.goal_name}
        completionDate ={goalData.goal_completion_date}
        savingsTarget = {goalData.savings_target}
        currentSavings = {goalData.current_savings}
        dailyGoal={this.dailyGoal(index)}
        isCompleted={goalData.isCompleted}
        color={this.colors[index % this.colors.length]}/>;
    });
    return (goalList);
  }

  dailyGoal(i) {
    var daysLeft = this.differenceInDays(i);

    var amountLeftToSave = this.state.goals[i].savings_target - this.state.goals[i].current_savings;
    var dailyGoal = amountLeftToSave / daysLeft;
    return (this.inDollars(dailyGoal));
  }

  todaysDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    return (today);
  }

  differenceInDays(i) {

    const todayDate = new Date(this.todaysDate());
    var goalDate = new Date(this.state.goals[i].goal_completion_date);
    var MS_IN_A_DAY = 86400000;
    var todayDateInMS = Date.UTC(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
    var goalDateInMS = Date.UTC(goalDate.getFullYear(), goalDate.getMonth(), goalDate.getDate());
    return (Math.floor((goalDateInMS - todayDateInMS) / MS_IN_A_DAY));

  }

  inDollars(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value / 100);
  }

  render() {

    return (
      <React.Fragment>

        {this.generateCards()}

        <div className={`goal-card gray`}>
          <span className="goal-card-title">Completed</span>
        </div>

      </React.Fragment>
    );
  }
}
