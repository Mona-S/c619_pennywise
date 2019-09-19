import React from 'react';

export default class CreateGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal_name: '',
      savings_target: '',
      current_savings: '',
      goal_completion_date: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.saveGoal();
  }

  saveGoal() {
    fetch('/api/create-goal.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(response => {
        response.json();
        this.props.setView('home', {});
      });
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} >
          <div className="form-group">

            <label className="formQuestion">What are you saving for ?</label>
            <br></br>

            <input type="text" name="goal_name" value={this.state.goal_name} pattern="[A-Za-z0-9]+" onChange={this.handleChange} id="goal_name" className="form-control" placeholder="Goal: Computer" />

          </div>

          <div className="form-group">
            <label className="formQuestion">How much does it cost?</label>
            <br></br>

            <input type="text" title="please enter numbers only" pattern="^[0-9]+(\.[0-9]{1,2})?" name="savings_target" value={this.state.savings_target} onChange={this.handleChange} id="savings_target" className="form-control" placeholder="please enter amount in $" />

          </div>

          <div className="form-group">
            <label className="formQuestion">How much are you starting with?</label>
            <br></br>

            <input type="text" title="please enter numbers only" pattern="^[0-9]+(\.[0-9]{1,2})?" name="current_savings" value={this.state.current_savings} onChange={this.handleChange} id="current_savings" className="form-control" placeholder="please enter amount in $" />

          </div>

          <div className="form-group">
            <label className="formQuestion">When do you need it by?</label>
            <br></br>
            <input type="date" name="goal_completion_date" value={this.state.goal_completion_date} onChange={this.handleChange} id="goal_completion_date" className="form-control" />
          </div>
          <button type="submit" name="submit" className="saveGoalButton" > <p className="saveGoalText">Save</p> </button>
        </form>

      </React.Fragment>
    );
  }
}
