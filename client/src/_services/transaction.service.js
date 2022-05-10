import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const userSubject = new BehaviorSubject(null);
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

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(params) {
    return fetchWrapper.put(baseUrl, params);
}

function getAll() {
    return fetchWrapper.get(`${baseUrl}/getAll`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/getById/${id}`);
}

function getByUserId(userId) {
    return fetchWrapper.get(`${baseUrl}/getByUserId/${userId}`);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/delete/${id}`)
}

function deleteAllByUserId(userId) {
    return fetchWrapper.get(`${baseUrl}/deleteAllByUserId/${userId}`);
}