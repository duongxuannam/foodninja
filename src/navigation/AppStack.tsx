import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAME} from './constant';
import Home from 'screen/Home';
import Login from 'screen/Login';

const Stack = createNativeStackNavigator();

interface AppStackProps {
  initScreen: string;
}

const AppStack = ({initScreen}: AppStackProps) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // statusBarHidden: true,
        // headerStyle: {
        //   backgroundColor: 'green',
        // },
      }}
      initialRouteName={initScreen}>
      <Stack.Screen name={SCREEN_NAME.HOME} component={Home} />
      <Stack.Screen name={SCREEN_NAME.LOGIN} component={Login} />
      {/*  <Stack.Screen name="demoList" component={DemoListScreen} /> */}
    </Stack.Navigator>
  );
};

export default AppStack;
