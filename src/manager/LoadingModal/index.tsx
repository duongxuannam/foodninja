import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {ZIndexLayer} from 'constant/layer';
import {useSelector} from 'store/index';

const LoadingModal = () => {
  const isLoading = useSelector(state => state?.app?.isLoading);
  const isInit = useSelector(state => state?.app?.isInit);

  if (!isLoading || !isInit) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.loadingContent}>
        <LottieView
          source={require('asset/lottie/loading.json')}
          autoPlay
          loop
          style={styles.loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: ZIndexLayer.LOADING_MODAL,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 5, 5, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  loading: {
    width: 50,
    height: 50,
  },
});

export default LoadingModal;
