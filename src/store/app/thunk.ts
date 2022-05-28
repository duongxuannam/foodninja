import {AppThunk} from '..';
import {setLanguage, setOnboard} from './appSlice';
import {setLanguage as setLanguageRN} from 'language/index';
import {save} from 'service/storage';

export const onChangeLanguageAction =
  (language: string): AppThunk =>
  async (dispatch, _) => {
    dispatch(setLanguage(language));
    await setLanguageRN(language);
  };
export const onChangeOnboardAction = (): AppThunk => async (dispatch, _) => {
  dispatch(setOnboard());
  await save('onboard', true);
};
