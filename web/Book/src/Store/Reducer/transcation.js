import {
    TRANSCATION_LOADED,
    TRANSCATION_LOADING,
    TRANSCATION_CREATED,
    TRANSCATION_DELETED,
    TRANSCATION_UPDATED,
    TRANSCATION_ERROR
  } from '../Action/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isLoading: false,
    transcation: null,
  };

  export default function (state = initialState ,action) {
    switch (action.type) {

      case TRANSCATION_LOADED:
        return {
            isLoading: false,
            transcation: action.payload.transcations.sort((a,b)=> a.createdAt - b.createdAt).reverse(),
        }; 
      case TRANSCATION_CREATED:
        return{
            isLoading: false,
            transcation: state.transcation.sort((a,b)=> a.createdAt - b.createdAt).reverse().concat(action.payload.transcations).sort((a,b)=> a.createdAt - b.createdAt).reverse(),
        }
      case TRANSCATION_DELETED:
          return{
              isLoading: false,
              transcation: state.transcation.filter(data => data._id !== action.payload.transcations._id)
          }
      case TRANSCATION_UPDATED:
          return {
                isLoading: false,
                transcation: state.transcation.map((data,index)=> data._id === action.payload.transcations._id ? action.payload.transcations : data)
            }
      case TRANSCATION_ERROR: {
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