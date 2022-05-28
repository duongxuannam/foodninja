import LoadingModal from 'manager/LoadingModal';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from 'store/index';
import App from './src/';

const ReduxProvider = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <App />
        <LoadingModal />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default ReduxProvider;
