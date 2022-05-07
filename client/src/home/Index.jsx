import React, { useEffect, useState } from "react";

import { accountService } from "@/_services";
import { transactionService } from "@/_services";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faArrowLeft,
  faArrowRight,
  faPencil,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import moment from 'moment'

function Home() {
  const user = accountService.userValue;
  const [transactions, setTransactions] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expensesBalance, setExpensesBalance] = useState(0);
  const [incomesBalance, setIncomesBalance] = useState(0);
  const [monthlyBalance, setMonthlyBalance] = useState(0);

  const [date, setDate] = useState();
  // const [listByMonth, setListByMonth] = useState([]);

  useEffect(() => {
    console.log('useEffect') // DEBUG
    if (expenses.length === 0 && incomes.length === 0) {
      transactionService.getByUserId(user.id).then(data => {
        console.log("getByUserId", data); // DEBUG

        getTransactionByMonth(moment(), data);

        setTransactions(data);

        // setDate(moment());


      });
    }
  }, []);

  const onSwitchMonth = (direction) => {

    const newDate = date;
    switch (direction) {
      case "+" :
        newDate.add(1, 'months');
        break;
      case "-" :
        newDate.subtract(1, 'months');
        break;
    }
    getTransactionByMonth(newDate, transactions);
  }

  const getTransactionByMonth = (date, transactions) => {

    console.log('date', date) // DEBUG
    console.log('transactions', transactions) // DEBUG
    
    setDate(moment(date));

    const incomes = [];
    const expenses = [];
    let incomesBalanceTemp = 0;
    let expensesBalanceTemp = 0;

    transactions.forEach(transaction => {
      
      if (moment(transaction.date).month() === date.month() ) {
        
        if (transaction.type === "income") {
          incomesBalanceTemp += transaction.value;
          incomes.push(transaction);
        }
        if (transaction.type === "expense") {
          expensesBalanceTemp += transaction.value;
          expenses.push(transaction);
        }

      }

    });

    setIncomes(incomes);
    setExpenses(expenses);

    console.log("incomesBalanceTemp", incomesBalanceTemp); // DEBUG
    console.log("expensesBalanceTemp", expensesBalanceTemp); // DEBUG
    
    setIncomesBalance(incomesBalanceTemp.toFixed(2));
    setExpensesBalance(expensesBalanceTemp.toFixed(2));

    const monthlyBalance = (incomesBalanceTemp - expensesBalanceTemp);

    console.log("monthlyBalance", monthlyBalance); // DEBUG


    if (monthlyBalance !== 0) {
      setMonthlyBalance(monthlyBalance);
    } else {
      setMonthlyBalance(0);
    }

  }

//   const createTransaction = (e) => {
//       e.preventDefault();

//       const transaction = {
//           "type": "income",
//           "value": 20.23,
//           "userId": 1,
//           "categoryId": 3,
//           "date": Date.now()
//       }
//       transactionService.create(transaction).then(data => {
//           console.log('data', data);
//       });
//     };

  //   const getAll = () => {
  //     transactionService.getAll().then(data => {
  //         console.log('data', data);
  //     });
  //   }

  //   const getById = (id) => {
  //     transactionService.getById(id).then(data => {
  //         console.log('data', data);
  //     });
  //   }

  //   const getByUserId = () => {
  //       if (user && user.id) {
  //         transactionService.getByUserId(user.id).then(data => {
  //             console.log('data', data);
  //         });
  //       }
  //   }

//   const _delete = (id) => {
//     transactionService._delete(id).then((data) => {
//       console.log("data", data);
//     });
//   };

//   const deleteAllByUserId = (id) => {
//     if (user && user.id) {
//       transactionService.deleteAllByUserId(id).then((data) => {
//         console.log("data", data);
//       });
//     }
//   };

  return (
    <div className="p-4">
      <div className="container-fluid">
        {/* <div onClick={createTransaction}>test trx</div> */}
        {transactions.length === 0 ? (
          <div className="row">
            <div>No transactions recorded</div>
            <div>add expese</div>
            <div>add income</div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              <div className="row mb-4">
                <h2 className="col-12 col-md-6 text-center text-md-left mb-4 mb-md-0">
                  Montly balance: {" "}
                  {
                    monthlyBalance === 0 ? (
                      <span>
                        ${monthlyBalance.toFixed(2)}
                      </span>
                    ) :
                    monthlyBalance > 0 ? (
                      <span className="color-green">
                        ${monthlyBalance.toFixed(2)}
                      </span>
                    ) :
                    monthlyBalance < 0 ? (
                      <span className="color-red">
                        ${monthlyBalance.toFixed(2)}
                      </span>
                    ) : 
                    null
                  }
                </h2>
                <div className="col-12 col-md-6 text-center text-md-right">
                  <button className="btn btn-danger mr-3">New expense</button>{" "}
                  <button className="btn btn-success ml-3">New income</button>
                </div>
              </div>
              <div className="row">
                <h2 className="col-12 mb-4">
                  <div className="row">
                    <div className="col text-right m-auto">
                      <button className="btn btn-info" onClick={() => onSwitchMonth("-")}>
                        <FontAwesomeIcon
                          icon={faArrowLeft}
                        />
                      </button>
                    </div>
                    <div className="col-2 text-center">
                      {date.format("MMMM yyyy")}
                    </div>
                    <div className="col text-left m-auto">
                      <button className="btn btn-info" onClick={() => onSwitchMonth("+")}>
                        <FontAwesomeIcon
                          icon={faArrowRight}
                        />
                      </button>
                    </div>
                  </div>
                </h2>
                <div className="col-12 col-md-6">
                  <div className="card bg-light mb-3">
                    <div className="card-header">
                      <h3 className="color-red text-center">Expenses ${expensesBalance}</h3>
                    </div>
                    <div className="card-body scrollable-card-content">
                      {expenses.length > 0 ? (
                        expenses.map((expense, index) => (
                          <div key={index} className="row">
                            <div className="col-auto m-auto">
                              {/* test icon */}
                              <FontAwesomeIcon icon={faCoffee} />
                            </div>
                            <div className="col m-auto">
                              <div>Test Category</div>
                              <div>
                                <Moment format="dddd MM/DD/YYYY">
                                  {expense.updatedAt}
                                </Moment>
                              </div>
                            </div>
                            <div className="col m-auto color-red">
                              {user.currency + expense.value}
                            </div>
                            <div className="col m-auto text-right">
                              <button className="btn btn-info mr-3">
                                <FontAwesomeIcon icon={faPencil} />
                              </button>
                              <button className="btn btn-danger">
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>
                          <div>No expenses recorded for this month</div>
                          <div>
                            <button className="btn btn-danger mr-3">
                              New expense
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="card bg-light mb-3">
                    <div className="card-header">
                      <h3 className="color-green text-center">Incomes ${incomesBalance}</h3>
                    </div>
                    <div className="card-body scrollable-card-content">
                      {incomes.length > 0 ? (
                        incomes.map((income, index) => (
                          <div key={index} className="row">
                            <div className="col-auto m-auto">
                              {/* test icon */}
                              <FontAwesomeIcon icon={faCoffee} />
                            </div>
                            <div className="col m-auto">
                              <div>Test Category</div>
                              <div>
                                <Moment format="dddd MM/DD/YYYY">
                                  {income.updatedAt}
                                </Moment>
                              </div>
                            </div>
                            <div className="col m-auto color-green">
                              {user.currency + income.value}
                            </div>
                            <div className="col m-auto text-right">
                              <button className="btn btn-info mr-3">
                                <FontAwesomeIcon icon={faPencil} />
                              </button>
                              <button className="btn btn-danger">
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>
                          <div>No incomes recorded for this month</div>
                          <div>
                            <button className="btn btn-success ml-3">
                              New income
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { Home };
