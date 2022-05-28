import {useDispatch} from 'store/index';
import {onChangeOnboardAction} from 'store/app/thunk';
import {useChooseTheme} from 'hook/app/appHook';
import {useCallback, useRef} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

export const useOnboardHook = () => {
  const dispatch = useDispatch();
  const {theme} = useChooseTheme();
  const scrollRef = useRef<ScrollView>(null);

  const onNext = useCallback(
    async (index: number) => {
      if (index === 1) {
        await dispatch(onChangeOnboardAction());
      } else {
        scrollRef?.current?.scrollToEnd();
      }
    },
    [dispatch],
  );

  return {
    theme,
    scrollRef,
    onNext,
  };
};
