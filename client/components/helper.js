// import React from 'react';
// import GoalCard from './goal-card';

export function differenceInDays(goal) {
  const todayDate = new Date(todaysDate());
  var goalDate = new Date(goal.goal_completion_date);
  var MS_IN_A_DAY = 86400000;
  var todayDateInMS = Date.UTC(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
  var goalDateInMS = Date.UTC(goalDate.getFullYear(), goalDate.getMonth(), goalDate.getDate());
  return (Math.floor((goalDateInMS - todayDateInMS) / MS_IN_A_DAY));

}

export function todaysDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;
  return (today);
}

export function inDollars(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value / 100);
}

export function dailyGoal(goal) {
  var daysLeft = differenceInDays(goal);
  var amountLeftToSave = goal.savings_target - goal.current_savings;
  var dailyGoalVar = amountLeftToSave / daysLeft;
  return (dailyGoalVar);

}

export function weeklyGoal(goal) {
  var daysLeft = differenceInDays(goal);
  if (daysLeft >= 7) {
    var weeks = (daysLeft / 7);
    var amountLeftToSave = goal.savings_target - goal.current_savings;
    var weeklyGoal = amountLeftToSave / weeks;
    return ((weeklyGoal));
  } else {
    return (goal.savings_target - goal.current_savings);

  }
}

// export function getTotalSavings(transactionHistory) {

//   var total = 0;
//   for (var i = 0; i < transactionHistory.length; i++) {
//     total += Number(transactionHistory[i].transaction_amount);
//   }

//   return total;
// }
