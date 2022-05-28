import I18nText from 'component/I18nText';
import Text from 'component/Text';
import View from 'component/View';
import {useChooseTheme} from 'hook/app/appHook';
import React, {RefObject, useEffect, useRef, useState} from 'react';
import {
  Button,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
  LayoutChangeEvent,
  NativeModules,
} from 'react-native';
import Animated, {
  AnimatableValue,
  Extrapolate,
  interpolate,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Screen from 'util/screen';
import isNumber from 'lodash/isNumber';
import {useHomeHook} from './homeHook';
import ZoomModal from './ZoomModal';
import {delay} from 'util/time';

const extrapolation = {
  extrapolateLeft: Extrapolate.CLAMP,
  extrapolateRight: Extrapolate.IDENTITY,
};

const testConnectNative = NativeModules.ExampleNative;

const Home = () => {
  const {onLogout, onChangeLanguage, onChangeAppearance, onClearOnboard} =
    useHomeHook();
  const {theme} = useChooseTheme();
  const [imgItem, setImgItem] = useState<any>();
  const refImage = useRef<Animated.View>(null);
  const refImage2 = useRef<Animated.View>(null);

  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const opacity = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacity.value, [0, 1], [0, 1]),
    };
  });

  const openModal = async ref => {
    ref?.current?.measure(async (x, y, width, height, pageX, pageY) => {
      setImgItem({
        x,
        y,
        height,
        width,
        pageX,
        pageY,
      });
      await setIsVisibleModal(true);
      await delay(100);
      opacity.value = 0;
    });
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    console.log('lay out ', layout);
    // console.log('Screen ', Screen.height, Screen.width);
  };

  const onCloseModal = async () => {
    await delay(100);
    opacity.value = 1;
    setIsVisibleModal(false);
  };
  return (
    // <SafeAreaView>
    <View bg={theme.primary} flex={1}>
      {/* <Text cl={theme.primaryText}>{I18nText('hello')}</Text> */}
      {/* <Text cl="black">ua al.o</Text> */}
      <Text cl={theme.primaryText}>{I18nText('hello')}</Text>
      <Button
        title="vn"
        onPress={() => {
          onChangeLanguage('vi');
        }}
      />
      <Button
        title="miniApp"
        onPress={async () => {
          // onChangeLanguage('en');

          // const vl = await testConnectNative.getChunkFilePath('main.bundle.js');
          // console.log('vl', vl);

          testConnectNative.goToMiniApp('miniApp', 'MiniApp');
        }}
      />
      <Button
        title="miniAppp"
        onPress={() => {
          // onChangeAppearance('light');
          testConnectNative.goToMiniApp('miniAppp', 'MiniAppp');
        }}
      />
      <Button
        title="dark"
        onPress={() => {
          onChangeAppearance('dark');
        }}
      />
      <Button title="Clear store onboard" onPress={onClearOnboard} />
      <Button title="Log out" onPress={onLogout} />
      {/* <View h={200} />
      <TouchableWithoutFeedback onPress={() => openModal(refImage)}>
        <Animated.View
          onLayout={onLayout}
          ref={refImage}
          style={[
            {
              height: 150,
              width: 200,
              marginLeft: 120,
            },
            rStyle,
          ]}>
          <Image
            style={[
              {
                height: '100%',
                width: '100%',
              },
            ]}
            resizeMode="cover"
            source={require('asset/png/avatar.png')}
          />
        </Animated.View>
      </TouchableWithoutFeedback> */}

      <View h={10} />
      <TouchableWithoutFeedback onPress={() => openModal(refImage2)}>
        <Animated.View
          onLayout={onLayout}
          ref={refImage2}
          style={[
            {
              height: 200,
              width: 250,
            },
            rStyle,
          ]}>
          <Image
            style={[
              {
                height: '100%',
                width: '100%',
              },
            ]}
            resizeMode="cover"
            source={require('asset/png/avatar.png')}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      {isVisibleModal && (
        <ZoomModal
          item={imgItem}
          isVisible={isVisibleModal}
          onClose={onCloseModal}
          imgSrc={require('asset/png/avatar.png')}
        />
      )}
    </View>
    // </SafeAreaView>
  );
};

export default Home;
