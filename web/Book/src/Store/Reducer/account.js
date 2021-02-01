import {
    ACCOUNTS_LOADED,
    ACCOUNT_CREATED,
    ACCOUNT_UPDATED,
    ACCOUNT_ERROR
  } from '../Action/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isLoading: false,
    account: null,
  };

  export default function (state = initialState ,action) {
    switch (action.type) {

      case ACCOUNTS_LOADED:
        return {
            isLoading: false,
            account: action.payload.accounts,
        }; 
      case ACCOUNT_CREATED:
        return{
            isLoading: false,
            account: state.account.concat(action.payload.accounts)
        }
      case ACCOUNT_UPDATED:
          return {
                isLoading: false,
                account: state.account.map((data,index)=> data._id === action.payload.accounts._id ? action.payload.accounts : data)
            }
      case ACCOUNT_ERROR: {
        return {
            ...state,
            error: action.payload,
            isLoading: false
          }
      }
      default:
        return state;
    }
  }