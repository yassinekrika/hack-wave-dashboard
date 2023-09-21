// types
import { createSlice } from '@reduxjs/toolkit';

const currentUser = localStorage.getItem("user") === null ? null : JSON.parse(localStorage.getItem("user"))


// initial state
const initialState = {
  currentUser: currentUser,
  isAuthenticated: false,
  isFetching: false,
  error: false,
};

// ==============================|| SLICE - MENU ||============================== //

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true
    },
    loginSuccess: (state, action) => {
      state.isFetching = false
      state.currentUser = action.payload
      state.loginFailure = false
      state.isAuthenticated = true
    },
    loginFailure: (state) => {
      state.isFetching = false
      state.loginFailure = true
      state.isAuthenticated = false
    },
    resetUser: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
      // localStorage.removeItem('user');
      // window.location.reload()
    }
  }
});

export default user.reducer;

export const { loginStart, loginSuccess, loginFailure, resetUser } = user.actions;