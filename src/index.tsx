import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {useInitApp} from 'hook/app/appHook';
import AppNavigator from 'navigation/index';
import View from 'component/View';
import OnboardModal from 'manager/OnboardModal';

const App = () => {
  const {initScreen, isInitDone} = useInitApp();
  if (!isInitDone) {
    return null;
  }

  return (
    <>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <View flex={1} bg={'blue'}>
          {/* <StatusBar height={initialWindowMetrics?.insets?.top} /> */}
          <AppNavigator initScreen={initScreen} />
          <OnboardModal />
        </View>
      </SafeAreaProvider>
    </>
  );
};

export default App;
