import {CaseReducer, current, PayloadAction} from '@reduxjs/toolkit';
import {AppearanceType, AppState} from './type';

export const initAppInfoAction: CaseReducer<
  AppState,
  PayloadAction<AppState>
> = (state, action) => ({
  ...state,
  ...action.payload,
  isInit: false,
});

export const getAppInfoAction: CaseReducer<
  AppState,
  PayloadAction<AppState>
> = _ => {};

export const setAppLoadingAction: CaseReducer<
  AppState,
  PayloadAction<boolean>
> = (state, action) => {
  state.isLoading = action.payload;
};

export const setInitAppAction: CaseReducer<AppState, PayloadAction<object>> = (
  state,
  action,
) => {
  // state.isInit = true;
  const currentState = current(state);
  return {...currentState, ...action.payload, isInit: true};
};

export const setForceRenderAction: CaseReducer<AppState> = state => {
  state.forceRender += 1;
};

export const setChangeAppearanceAction: CaseReducer<
  AppState,
  PayloadAction<AppearanceType>
> = (state, action) => {
  state.appearance = action.payload;
};

export const setLanguageAction: CaseReducer<AppState, PayloadAction<string>> = (
  state,
  action,
) => {
  state.language = action.payload;
};

export const setOnboardAction: CaseReducer<AppState> = state => {
  state.onboard = true;
};
