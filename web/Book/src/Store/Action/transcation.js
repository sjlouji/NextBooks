import axios from 'axios';
import {
    TRANSCATION_LOADED,
    TRANSCATION_LOADING,
    TRANSCATION_CREATED,
    TRANSCATION_DELETED,
    TRANSCATION_UPDATED,
    TRANSCATION_ERROR
} from './types';


const api = axios.create({
  baseURL: `http://localhost:8000`
})

//  Load Accounts 
export const loadTranscation = () => (dispatch, getState) => {
  dispatch({ type: TRANSCATION_LOADING });
  api
    .get(`/transcation`, tokenConfig(getState))
    .then((res) => {
      console.log(res.data)
      dispatch({
        type: TRANSCATION_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: TRANSCATION_ERROR,
        payload: err,
      });
    });
};

//  Add a new Account
export const addTranscation = (description, transcation_type, amount, account, debit, category) => (dispatch, getState) => {

    // Request Body
    const body = JSON.stringify({ description, transcation_type, amount, account, debit, category });
    console.log(body)
    api
      .post(`/transcation/create`, body ,tokenConfig(getState))
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: TRANSCATION_CREATED,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: TRANSCATION_ERROR,
          payload: err,
        });
      });
};

//  Delete a Account
export const deleteTranscation = (id) => (dispatch, getState) => {

    // Request Body
    const body = JSON.stringify({ id });
    console.log(body)
    api
      .post(`/transcation/delete`, body ,tokenConfig(getState))
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: TRANSCATION_DELETED,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: TRANSCATION_ERROR,
          payload: err,
        });
      });
};

//  Update a new Account
export const updateTranscation = (id, debit, description, category, account, transcation_type, amount) => (dispatch, getState) => {

    // Request Body
    const body = JSON.stringify({ id, debit, description, category, account, transcation_type, amount });
    console.log(body)
    api
      .post(`/transcation/update`, body ,tokenConfig(getState))
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: TRANSCATION_UPDATED,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: TRANSCATION_ERROR,
          payload: err,
        });
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