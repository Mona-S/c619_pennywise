import React from 'react';
import Header from './header';
import Home from './home';
import Onboarding from './onboarding';
import CreateGoal from './create-goal';
import GoalDetails from './goal-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {

        name: 'onboarding',

        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }
  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  renderView() {
    switch (this.state.view.name) {
      case 'onboarding':
        return (
          <Onboarding
            setView={this.setView}
            params={this.state.view.params}
          />
        );

      case 'creategoal':
        return (
          <CreateGoal
            params={this.state.view.params}
            setView={this.setView}/>
        );

      case 'goaldetails':
        return (
          <GoalDetails
            params={this.state.view.params}
            setView={this.setView}/>
        );

      case 'home':
        return (
          <Home
            params={this.state.view.params}
            setView={this.setView}/>
        );

    }
  }

  render() {
    return (
      <React.Fragment>

        <Header
          setView={this.setView}/>

        {this.renderView()}
      </React.Fragment>
    );
  }
}
