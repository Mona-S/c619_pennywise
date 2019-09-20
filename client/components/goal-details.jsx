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

  getDaysRemaining() {
    return (
      <div className="days-row">
        <span className="days-number">{differenceInDays(this.state)}</span>
        <span className="days-left-text"> days left </span>
      </div>
    );
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

  newDailyAndWeeklyGoal() {
    return (

      <React.Fragment>

        <div className="card-container">
          <div className="goals-row">

            <div className="goals-total-container">
              <div className="daily-totals-text">
                {inDollars(dailyGoal(this.state))}
              </div>
              <div className="per-day-text">
                /day
              </div>
            </div>

            <div className="goals-total-container">
              <div className="weekly-totals-text">
                {inDollars(weeklyGoal(this.state))}

              </div>
              <div className="per-week-text">
                /week
              </div>
            </div>

          </div>
        </div>
      </React.Fragment>

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
    this.setState({
      amount_changed: ''
    });

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
    return (
      <React.Fragment>
        <form>
          <div className="goalDetailsInput">
            <input
              className="goalDetailsInput"
              type="text"
              name="amount_changed"
              value={this.state.amount_changed}
              onChange={this.handleChange}
              placeholder="add or remove funds in $"
            ></input>
          </div>

          <button
            type="submit"
            name="add"
            className="add-button"
            onClick={e => this.handleSubmit(e, 1)}
          >
            <span className="plus-symbol">+</span>
          </button>
          <button
            type="submit"
            name="subtract"
            className="subtract-button"
            onClick={e => this.handleSubmit(e, -1)}
          >
            <span className="minus-symbol">-</span>
          </button>

        </form>
      </React.Fragment>
    );
  }

  getCardTitle() {
    return (
      // <div className="card-container">
      <div className={`goal-card ${this.props.params.color}`}>
        <span className="goal-card-title"> {this.state.goal_name}</span>
      </div>
      // </div>
    );
  }

  makeTransactionHistory() {
    return (
      <div>
        <div className="Transaction-History">Transaction History</div>
        {/* <div className="Line2"></div> */}
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
        <div className="dateAmountLine"></div>
      </React.Fragment>
    );
  }

  render() {

    return (

      <React.Fragment>
        <div className="card-container">
          {this.getDaysRemaining()}
        </div>
        <div className="card-container">
          {this.getCardTitle()}
        </div>
        <div className="card-container">
          {this.getProgress()}
        </div>
        {this.towardsSavings()}
        {this.newDailyAndWeeklyGoal()}
        {this.addOrRemoveButtons()}
        {this.makeTransactionHistory()}
        {this.getTransDate()}
        {this.getHistory()}
      </React.Fragment>

    );
  }
}
