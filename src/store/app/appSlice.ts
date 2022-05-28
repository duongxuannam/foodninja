import {createSlice} from '@reduxjs/toolkit';
import {AppState} from './type';
import {
  initAppInfoAction,
  getAppInfoAction,
  setAppLoadingAction,
  setInitAppAction,
  setForceRenderAction,
  setLanguageAction,
  setChangeAppearanceAction,
  setOnboardAction,
} from './action';

const initialState: AppState = {
  language: '',
  appVersion: '',
  isInit: false,
  isLoading: false,
  forceRender: 0,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initAppInfoAction,
    getAppInfoAction,
    setAppLoadingAction,
    setInitAppAction,
    setForceRenderAction,
    setLanguageAction,
    setChangeAppearanceAction,
    setOnboardAction,
  },
});

export const appReducer = appSlice.reducer;

export const {
  initAppInfoAction: initAppInfo,
  getAppInfoAction: getAppInfo,
  setAppLoadingAction: setAppLoading,
  setInitAppAction: setInitApp,
  setForceRenderAction: setForceRender,
  setLanguageAction: setLanguage,
  setChangeAppearanceAction: setChangeAppearance,
  setOnboardAction: setOnboard,
} = appSlice.actions;
