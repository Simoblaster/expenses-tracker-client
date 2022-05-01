import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const baseUrl = `${config.apiUrl}/transaction`;

export const transactionService = {
    create,
    update,
    getAll,
    getById,
    getByUserId,
    _delete,
    deleteAllByUserId
};

function create(transaction) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    };
    return fetch(`${baseUrl}/create`, requestOptions).then(handleResponse);
}

function update(transaction, id) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    };
    return fetch(`${baseUrl}/update/${id}`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${baseUrl}/getAll`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${baseUrl}/getById/${id}`, requestOptions).then(handleResponse);
}

function getByUserId(userId) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${baseUrl}/getByUserId/${userId}`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${baseUrl}/delete/${id}`, requestOptions).then(handleResponse);
}

function deleteAllByUserId(userId) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${baseUrl}/deleteAllByUserId/${userId}`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && accountService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                accountService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}