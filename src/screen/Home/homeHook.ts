import {useDispatch} from 'store/index';
import {logOutAction} from 'store/user/thunk';
import {onChangeLanguageAction} from 'store/app/thunk';
import {setChangeAppearance} from 'store/app/appSlice';
import {AppearanceType} from 'store/app/type';
import {remove} from 'service/storage';

export const useHomeHook = () => {
  const dispatch = useDispatch();

  const onChangeLanguage = async (language: string) => {
    dispatch(onChangeLanguageAction(language));
  };

  const onChangeAppearance = async (mode: AppearanceType) => {
    dispatch(setChangeAppearance(mode));
  };

  const onLogout = async () => {
    dispatch(logOutAction());
  };

  const onClearOnboard = async () => {
    await remove('onboard');
  };

  return {
    onLogout,
    onChangeLanguage,
    onChangeAppearance,
    onClearOnboard,
  };
};
