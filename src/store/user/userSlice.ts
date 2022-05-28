import {createSlice} from '@reduxjs/toolkit';
import {UserState} from './type';
import {saveUserInfoAction, getUserInfoAction} from './action';

export const initialState: UserState = {
  id: '',
  name: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserInfoAction,
    getUserInfoAction,
  },
});

export const userReducer = userSlice.reducer;

export const {
  saveUserInfoAction: saveUserInfo,
  getUserInfoAction: getUserInfo,
} = userSlice.actions;
