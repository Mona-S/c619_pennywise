import React from 'react';
import {
  inDollars
} from './helper.js';

export default function TransactionHistory(props) {

  return (
    <React.Fragment>
      <div className="transContainer">

        <span className="trans-card-title transactionInputDate">{props.date}</span>
        <span className="trans-amount transactionInputAmount">{inDollars(props.amount)}</span>
        {/* <div className="Line2"></div> */}

      </div>

    </React.Fragment>
  );
}
