import {UserState} from './type';
import {initialState, saveUserInfo} from './userSlice';
import {AppThunk} from '../index';
import {setAppLoading} from 'store/app/appSlice';
import {delay} from 'util/time';
import {save, clear} from 'service/storage';

export const loginAction =
  (user: UserState): AppThunk =>
  async (dispatch, _) => {
    dispatch(setAppLoading(true));
    await delay(1000);
    dispatch(saveUserInfo(user));
    dispatch(setAppLoading(false));
    await save('user', user);
  };

export const logOutAction = (): AppThunk => async (dispatch, _) => {
  dispatch(setAppLoading(true));
  await delay(1000);
  dispatch(saveUserInfo(initialState));
  dispatch(setAppLoading(false));
  await clear();
};
