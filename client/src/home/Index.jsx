import React from 'react';

import { accountService } from '@/_services';
import { transactionService } from '@/_services';


function Home() {
    const user = accountService.userValue;

    const createTransaction = (e) => {
        e.preventDefault();
        const transaction = {
            "type": "income",
            "value": 20.23,
            "userId": 1,
            "categoryId": 3
        }
        transactionService.create(transaction).then(data => {
            console.log('data', data);
        });
      };

      const getAll = () => {
        transactionService.getAll().then(data => {
            console.log('data', data);
        });
      }

      const getById = (id) => {
        transactionService.getById(id).then(data => {
            console.log('data', data);
        });
      }

      const getByUserId = () => {
          if (user && user.id) {
            transactionService.getByUserId(user.id).then(data => {
                console.log('data', data);
            });
          }
      }

      const _delete = (id) => {
        transactionService._delete(id).then(data => {
            console.log('data', data);
        });
      }
      
      const deleteAllByUserId = (id) => {
        if (user && user.id) {
            transactionService.deleteAllByUserId(id).then(data => {
                console.log('data', data);
            });
        }
      }
    
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <div>
                    create a transaction
                </div>
                <form>
                    <div>a</div>
                    <button type='button' onClick={createTransaction}>send</button>
                </form>
            </div>
        </div>
    );
}

export { Home };