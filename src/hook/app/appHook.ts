import {SCREEN_NAME} from 'navigation/constant';
import {navigationRef, replace} from 'navigation/helper';
import {useEffect, useMemo, useState} from 'react';
import get from 'lodash/get';
import {RootState, useDispatch, useSelector} from 'store/index';
import SplashScreen from 'react-native-splash-screen';
import {load} from 'service/storage';
import {setInitApp} from 'store/app/appSlice';
import {loginAction} from 'store/user/thunk';
import {DARK_MODE, DEFAULT} from 'util/common/color';
import {useColorScheme} from 'react-native';

export const useInitApp = () => {
  const [initScreen, setInitScreen] = useState<string>('');
  const isInitDone = useSelector(state => state.app.isInit);
  const dispatch = useDispatch();

  useAuth();

  useEffect(() => {
    const getAppInfo = async () => {
      const user = await load('user');
      const isSeenOnboard = await load('onboard');
      const token = user?.token;
      if (user?.token) {
        dispatch(
          loginAction({
            id: '123',
            name: 'Nammm',
            token: 'day_la_cai_toke',
          }),
        );
      }
      await setInitScreen(user?.token ? SCREEN_NAME.HOME : SCREEN_NAME.LOGIN);
      dispatch(setInitApp({onboard: isSeenOnboard, token}));
      SplashScreen.hide();
    };
    getAppInfo();
  }, [dispatch]);

  return {
    initScreen,
    isInitDone,
  };
};

const useAuth = () => {
  const token = useSelector((state: RootState) => state?.user?.token);

  useEffect(() => {
    if (token) {
      const rootState = navigationRef?.getRootState();
      const isLoginPage =
        get(rootState, ['routes', 0, 'name'], '') === SCREEN_NAME.LOGIN;
      if (isLoginPage) {
        replace(SCREEN_NAME.HOME);
      }
    } else {
      replace(SCREEN_NAME.LOGIN);
    }
  }, [token]);
};

export const useChooseLanguage = () => {
  const language = useSelector(state => state?.app.language);
  return {
    language,
  };
};

export const useChooseTheme = () => {
  const colorScheme = useColorScheme();
  const appearance = useSelector(state => state?.app?.appearance);
  const color = useMemo(() => {
    const finalMode = appearance || colorScheme;
    const isDarkMode = finalMode === 'dark';
    console.log('usDrak ', isDarkMode);
    return {
      theme: isDarkMode ? DARK_MODE : DEFAULT,
      isDarkMode,
    };
  }, [colorScheme, appearance]);
  return color;
};
