import {CaseReducer, PayloadAction} from '@reduxjs/toolkit';
import {UserState} from './type';

export const saveUserInfoAction: CaseReducer<
  UserState,
  PayloadAction<UserState>
> = (_, action) => action.payload;

export const getUserInfoAction: CaseReducer<
  UserState,
  PayloadAction<UserState>
> = (_, action) => action.payload;
