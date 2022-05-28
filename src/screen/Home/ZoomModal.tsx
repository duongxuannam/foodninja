import Text from 'component/Text';
import View from 'component/View';
import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolate,
  useSharedValue,
  withTiming,
  runOnJS,
  interpolateColor,
  withSpring,
} from 'react-native-reanimated';
import Screen, {rh, rw} from 'util/screen';

type Props = {
  isVisible: boolean;
  onClose: Function;
  imgSrc?: string;
  item?: any;
};
const extrapolation = {
  extrapolateLeft: Extrapolate.CLAMP,
  extrapolateRight: Extrapolate.CLAMP,
};

const LIMIT_CLOSE = rh(200);

export default function ZoomModal({isVisible, onClose, imgSrc, item}: Props) {
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const startYPosition = 0;
  const offsetYPosition = useSharedValue(0);
  const yPosition = useSharedValue(startYPosition);

  const animatedValue = useSharedValue<number | any>(0);

  const rContainerStyle = useAnimatedStyle(() => {
    if (yPosition.value) {
      return {
        backgroundColor: interpolateColor(
          Math.abs(Number(yPosition.value)),
          [LIMIT_CLOSE, 0],
          ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)'],
        ),
      };
    }
    return {
      backgroundColor: interpolateColor(
        animatedValue.value,
        [0, 0.2, 1],
        ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0,0.8)', 'rgba(0, 0, 0, 1)'],
      ),
    };
  });
  const rStyle = useAnimatedStyle(() => {
    if (!item) {
      return {};
    }
    return {
      top: interpolate(
        animatedValue.value,
        [0, 1],
        [item?.pageY, 0],

        extrapolation,
      ),
      left: interpolate(
        animatedValue.value,
        [0, 1],
        [item?.pageX, 0],

        extrapolation,
      ),
      width: interpolate(
        animatedValue.value,
        [0, 1],
        [item?.width, Screen.width],

        extrapolation,
      ),
      height: interpolate(
        animatedValue.value,
        [0, 1],
        [item?.height, Screen.height],
        extrapolation,
      ),
      transform: [
        {rotateZ: `${(rotation.value / Math.PI) * 180}deg`},
        {scale: scale.value},
      ],
      scale: scale.value,
    };
  });

  const uas = useAnimatedStyle(() => {
    if (!yPosition.value) {
      return {};
    }
    return {
      top: yPosition.value,
    };
  });

  const rCloseIcon = useAnimatedStyle(() => {
    return {
      opacity: yPosition.value
        ? interpolate(
            Math.abs(Number(yPosition.value)),
            [0, LIMIT_CLOSE, LIMIT_CLOSE + 1],
            [1, 0, 0],
            extrapolation,
          )
        : interpolate(animatedValue.value, [0, 1], [0, 1], extrapolation),
      // opacity: interpolate(
      //   Math.abs(Number(yPosition.value)),
      //   [0, LIMIT_CLOSE, LIMIT_CLOSE + 1],
      //   [1, 0, 0],
      //   extrapolation,
      // ),
    };
  });

  const onShow = () => {
    console.log('run');
    animatedValue.value =
      // withDelay(
      // 100,
      withTiming(1, {
        // duration: 2000,
      });
    // );
  };

  const onCloseModal = () => {
    const handleClose = () => {
      onClose();
    };
    // yPosition.value = 0;
    scale.value = withTiming(1);
    savedScale.value = 1;
    rotation.value = withTiming(0);
    savedRotation.value = 0;
    animatedValue.value = withSpring(
      0,
      {
        // duration: 200,
      },
      isFinish => isFinish && runOnJS(handleClose)(),
    );
  };

  const touchStart = useSharedValue({x: 0, y: 0, time: 0});
  const panGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesDown(e => {
      touchStart.value = {
        x: e.changedTouches[0].x,
        y: e.changedTouches[0].y,
        time: Date.now(),
      };
    })
    .onTouchesMove((e, state) => {
      if (Math.abs(touchStart.value.y - e.changedTouches[0].y) > 0) {
        state.activate();
      } else {
        state.fail();
        scale.value = withTiming(1);
        savedScale.value = 1;
        rotation.value = withTiming(0);
        savedRotation.value = 0;
      }
    })

    .onUpdate(event => {
      yPosition.value = offsetYPosition.value + event.translationY;
    })
    .onEnd(_ => {
      'worklet';
      const isClose = Math.abs(Number(yPosition.value)) > LIMIT_CLOSE;
      yPosition.value = withTiming(startYPosition, {}, () => {
        if (isClose) {
          runOnJS(onCloseModal)();
          return;
        }
      });
    });

  const rotationGesture = Gesture.Rotation()
    .onUpdate(e => {
      rotation.value = savedRotation.value + e.rotation;
      // rotation.value = e.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
      // rotation.value = 0;
    });

  const zoomGesture = Gesture.Pinch()

    .onUpdate(event => {
      scale.value = savedScale.value * event.scale;
      // scale.value = event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      // scale.value = 1;
    });

  const composed = Gesture.Simultaneous(
    rotationGesture,
    zoomGesture,
    panGesture,
  );

  // const isActive = useSate(1);
  return (
    <Modal
      style={styles.container}
      visible={isVisible}
      transparent={true}
      onShow={onShow}
      animationType="none">
      <Component
        rCloseIcon={rCloseIcon}
        composed={composed}
        rContainerStyle={rContainerStyle}
        rStyle={rStyle}
        uas={uas}
        item={item}
        onCloseModal={onCloseModal}
      />
    </Modal>
  );
}

const Component = gestureHandlerRootHOC(
  ({
    composed,
    rContainerStyle,
    rStyle,
    uas,
    item,
    onCloseModal,
    rCloseIcon,
  }) => (
    <Animated.View style={[styles.flex1]}>
      <Animated.View
        style={[{height: Screen.height, width: Screen.width}, rContainerStyle]}>
        <GestureDetector gesture={composed}>
          <ScrollView
            // ref={scrollRef}
            bounces={false}
            horizontal
            pagingEnabled
            onScrollEndDrag={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
              console.log('evetn', e.nativeEvent);
            }}
            // scrollEnabled={false}
            style={{
              height: Screen.height,
              width: Screen.width,
            }}>
            {[{id: 1}, {id: 2}, {id: 3}].map((items, index) => {
              return (
                <Animated.View
                  key={index}
                  style={{
                    height: Screen.height,
                    width: Screen.width,
                    overflow: 'hidden',
                    // position: 'absolute',
                  }}>
                  {/* <Animated.View style={[{flex: 1}, rtransform]}> */}
                  <Animated.View
                    collapsable={false}
                    style={[styles.center, rStyle, uas]}>
                    <Image
                      style={[
                        {
                          width: '100%',
                          aspectRatio: item.width / item.height,
                          height: undefined,
                        },
                      ]}
                      // resizeMode="cover"
                      // source={require('asset/png/avatar.png')}
                      source={require('asset/png/avatar.png')}
                    />
                  </Animated.View>
                </Animated.View>
              );
            })}
          </ScrollView>
        </GestureDetector>
      </Animated.View>

      <Animated.View
        style={[
          {
            position: 'absolute',
            top: rh(30),
            right: rh(20),
            zIndex: 100,
          },
          rCloseIcon,
        ]}>
        <TouchableOpacity onPress={onCloseModal}>
          <Image
            style={[
              {
                width: rw(20),
                aspectRatio: 1,
                height: undefined,
              },
            ]}
            // resizeMode="cover"
            // source={require('asset/png/avatar.png')}
            source={require('./close.png')}
          />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  ),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: {
    flex: 1,
  },
});
