import 'react-native-gesture-handler';
import React from 'react';
import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {navigationRef, useBackButtonHandler} from './helper';
import AppStack from './AppStack';
import {SCREEN_NAME} from './constant';

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {
  initScreen: string;
}

const AppNavigator = (props: NavigationProps) => {
  // return <View bg="pink" flex={1} />;
  const colorScheme = useColorScheme();
  useBackButtonHandler(canExit);
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      {...props}>
      <AppStack initScreen={props.initScreen} />
    </NavigationContainer>
  );
};

export default AppNavigator;

const exitRoutes = [SCREEN_NAME.HOME];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
