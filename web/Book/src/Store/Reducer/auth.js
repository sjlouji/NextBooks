import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET_PASSWORD,
    CHANGE_PASSWORD,
  } from '../Action/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null,
  };

  export default function (state = initialState ,action) {
    switch (action.type) {

      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload,
        };
      case LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.Token);
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          isLoading: false,
        };
      case REGISTER_SUCCESS:
        localStorage.setItem('token', action.payload.Token)
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          isLoading: false,
        };
      case AUTH_ERROR:
        return {
          ...state,
          error: action.payload,
        }
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
        localStorage.removeItem('token');
        return{
          logout: 'SUCCESS'
        }
      case RESET_PASSWORD:
        return{
          reset: action.payload
        };
      case CHANGE_PASSWORD:
        return{
          reset: action.payload
        };
      case REGISTER_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        };
      default:
        return state;
    }
  }