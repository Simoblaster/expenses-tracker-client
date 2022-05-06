import React, { useEffect, useState } from "react";

import { accountService } from "@/_services";
import { transactionService } from "@/_services";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import moment from 'moment'

function Home() {
  const user = accountService.userValue;
  const [transactions, setTransactions] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

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

    transactions.forEach(transaction => {
      
      if (moment(transaction.date).month() === date.month() ) {
        
        if (transaction.type === "income") {
          incomes.push(transaction);
        }
        if (transaction.type === "expense") {
          expenses.push(transaction);
        }

      }

    });

    // if (incomes.length > 0) {
      setIncomes(incomes);
    // }

    // if (expenses.length > 0) {
      setExpenses(expenses);
    // }
    


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
                  Montly balance: $ 300
                </h2>
                <div className="col-12 col-md-6 text-center text-md-right">
                  <button className="btn btn-danger mr-3">New expense</button>{" "}
                  <button className="btn btn-success ml-3">New income</button>
                </div>
              </div>
              <div className="row">
                <h2 className="col-12 text-center mb-4">
                    {/* Todo */}
                  <FontAwesomeIcon className="cursor-pointer" onClick={() => onSwitchMonth('-')} icon={faArrowLeft} /> {date.format("MMMM yyyy")}{" "}
                  <FontAwesomeIcon className="cursor-pointer" onClick={() => onSwitchMonth('+')} icon={faArrowRight} />
                </h2>
                <div className="col-12 col-md-6">
                  <div className="card bg-light mb-3">
                    <div className="card-header">
                      <h3 className="color-red text-center">Expenses</h3>
                    </div>
                    <div className="card-body scrollable-card-content">
                      {expenses.map((expense, index) => (
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
                            {user.currency + " " + expense.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="card bg-light mb-3">
                    <div className="card-header">
                      <h3 className="color-green text-center">Incomes</h3>
                    </div>
                    <div className="card-body scrollable-card-content">
                      {incomes.map((income, index) => (
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
                            {user.currency + " " + income.value}
                          </div>
                        </div>
                      ))}
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
