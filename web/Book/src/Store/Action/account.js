import axios from 'axios';
import {
    ACCOUNTS_LOADED,
    ACCOUNTS_LOADING,
    ACCOUNT_CREATED,
    ACCOUNT_DELETED,
    ACCOUNT_UPDATED,
    ACCOUNT_ERROR
} from './types';


const api = axios.create({
  baseURL: `http://localhost:8000`
})

//  Load Accounts 
export const loadAccount = () => (dispatch, getState) => {
  dispatch({ type: ACCOUNTS_LOADING });
  api
    .get(`/account/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ACCOUNTS_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
        dispatch({ 
            type: ACCOUNT_ERROR,
            payload: err
        })
    });
};

//  Add a new Account
export const addAccount = (account_id, account_name, account_type, initialBalance, account_provider) => (dispatch, getState) => {

    // Request Body
    const body = JSON.stringify({ account_id,account_name, account_type, initialBalance, account_provider });
    console.log(body)
    api
      .post(`/account/create`, body ,tokenConfig(getState))
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: ACCOUNT_CREATED,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({ 
            type: ACCOUNT_ERROR,
            payload: err
        })
      });
};

//  Delete a Account
export const deleteAccount = (id) => (dispatch, getState) => {

    // Request Body
    const body = JSON.stringify({ id });
    console.log(body)
    api
      .post(`/account/delete`, body ,tokenConfig(getState))
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: ACCOUNT_DELETED,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({ 
            type: ACCOUNT_ERROR,
            payload: err
        })
      });
};

//  Update a new Account
export const updateAccount = (id, account_name, account_type, account_provider) => (dispatch, getState) => {

    // Request Body
    const body = JSON.stringify({ id, account_name, account_type, account_provider });
    console.log(body)
    api
      .post(`/account/update`, body ,tokenConfig(getState))
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: ACCOUNT_UPDATED,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({ 
            type: ACCOUNT_ERROR,
            payload: err
        })
      });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};