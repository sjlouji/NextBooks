import axios from 'axios';
import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  AUTH_ERROR,
} from './types';


const api = axios.create({
  baseURL: `http://localhost:8000`
})

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  api
    .get(`/auth/secret`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      console.log(res.data)
    })
    .catch((err) => {
      console.log("In auth")

    });
};

// LOGIN USER
export const login = (email, password) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // Request Body
  const body = JSON.stringify({ email, password });

  api
    .post('/auth/login', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      console.log(res.data)
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
        payload: err
      })
    });
};

// REGISTER USER
export const register = ({ first_name,last_name, password, email, mobile }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ first_name,last_name, email, password, mobile });

  api
    .post('/auth/register', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
        payload: err
      })
    });
};

// RESET PASSWORD USER
export const resetPassword = ( email ) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ email });

  api
    .post('/auth/reset', body, config)
    .then((res) => {
      dispatch({
        type: RESET_PASSWORD,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
        payload: err
      })
    });
};

// PASSWORD CHANGE
export const changePassword = ( newpassword, resetLink ) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${resetLink}`,
    
    },
  };
  console.log(newpassword,resetLink)
  // Request Body
  const body = JSON.stringify({ newpassword, resetLink });
  console.log(body)
  api
    .put('/auth/reset', body, config)
    .then((res) => {
      dispatch({
        type: CHANGE_PASSWORD,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
        payload: err
      })
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  console.log("logged out")
  dispatch({
    type: LOGOUT_SUCCESS,
    payload: "he"
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