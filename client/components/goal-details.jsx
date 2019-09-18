import React from 'react';
import { dailyGoal, differenceInDays, weeklyGoal, inDollars } from './helper.js';

import TransactionHistory from './transaction-history';

export default class GoalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      amount_changed: '',

      goal_id: '',
      current_savings: '',
      goal_achieved_date: '',
      goal_completion_date: '',
      goal_name: '',
      goal_start_date: '',
      is_completed: '',
      savings_target: '',
      transaction_history: ''

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount(props) {
    this.getGoal();
  }

  getGoal(props) {
    const currentParam = this.props.params.id;
    fetch(`/api/goals.php?goal_id=` + currentParam)

      .then(res => res.json())
      // eslint-disable-next-line no-console
      .then(response => {
        this.setState({
          ...response,
          current_savings: this.getTotalSavings(response.transaction_history)
        });
      });
  }

  getProgress() {
    const percent = this.state.current_savings / this.state.savings_target;
    const percentage = Math.round(percent * 100);
    const styling = {
      width: `${percentage}%`
    };
    return (
      <div className="progress-bar">
        <div className="bar-background">
          <div className="bar-green" style={styling} >

          </div>
        </div>
      </div>
    );
  }

  newDailyGoal() {
    return (
      <div>
        <div className="dailyGoal">
          {inDollars(dailyGoal(this.state))}

        </div>
        <div className="Day"> /day </div>

      </div>
    );
  }

  newWeeklyGoal() {
    return (
      <div className="weeklyGoal">
        {inDollars(weeklyGoal(this.state))}
        <div className="week">/days</div>
      </div>
    );
  }

  towardsSavings() {
    return (
      <div className="-toward-6000">
        {inDollars(this.state.current_savings)} towards {''}
        {inDollars(this.state.savings_target)}
      </div>
    );
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

  handleSubmit(event, direction = 1) {
    event.preventDefault();
    this.amountChange(direction);
  }

  amountChange(direction) {

    fetch(`/api/transaction.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount_changed: direction * this.state.amount_changed,
        goal_id: this.state.goal_id,
        name: ''
      })
    })
      .then(response => {
        return response.json();
      })
      .then(transaction => {

        this.getGoal();
      });

  }

  getTotalSavings(transactionHistory) {

    var total = 0;
    for (var i = 0; i < transactionHistory.length; i++) {
      total += Number(transactionHistory[i].transaction_amount);
    }

    return total;
  }

  addOrRemoveButtons() {
    // onSubmit={this.handleSubmit}
    return (
      <React.Fragment>
        <form>
          <div className="add-or-remove-funds">
            <input
              className="goalDetailsInput"
              type="text"
              name="amount_changed"
              value={this.state.amount_changed}
              onChange={this.handleChange}
              placeholder="add or remove funds"
            ></input>
            {/* <div className="Line"></div> */}
          </div>
          {/* <div className="buttonContainer"> */}
          <button
            type="submit"
            name="subtract"
            className="subtract-button"
            onClick={e => this.handleSubmit(e, -1)}
          >-</button>
          <button
            type="submit"
            name="add"
            className="add-button"
            onClick={e => this.handleSubmit(e, 1)}
          >
              +
          </button>
          {/* </div> */}
        </form>
      </React.Fragment>
    );
  }

  getCardTitle() {
    return (

      <div className={`goal-card-title ${this.props.params.color}`}>

        <span className="goal-card"> {this.state.goal_name}</span>
      </div>
    );
  }

  getDaysRemaining() {
    return (
      <div className="daysRemaining">{differenceInDays(this.state)} <span className="Days"> days </span></div>
    );
  }

  makeTransactionHistory() {
    return (
      <div>
        <div className="Transaction-History">Transaction History</div>
        <div className="Line2"></div>
      </div>
    );
  }

  getHistory() {
    if (!this.state.transaction_history) {
      return;
    }
    const transHistory = this.state.transaction_history.map((transaction, index) => {
      return (
        <TransactionHistory
          key={index}
          date={transaction.transaction_date}
          amount={transaction.transaction_amount}
        />
      );

    });
    return transHistory;
  }

  getTransDate() {
    return (
      <React.Fragment>
        <div className="Date">Date</div>
        <div className="Amount">Amount</div>
        <div className="Line2"></div>
      </React.Fragment>
    );
  }

  render() {

    return (
      <React.Fragment>
        {this.getDaysRemaining()}
        {this.getCardTitle()}
        {this.getProgress()}
        {this.towardsSavings()}
        {this.newDailyGoal()}
        {this.newWeeklyGoal()}
        {this.addOrRemoveButtons()}
        {this.makeTransactionHistory()}
        {this.getTransDate()}
        {this.getHistory()}
      </React.Fragment>
    );
  }
}
