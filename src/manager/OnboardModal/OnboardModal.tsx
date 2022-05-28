import React from 'react';
import ButtonGradient from 'component/ButtonGradient';
import I18nText from 'component/I18nText';
import Text from 'component/Text';
import View from 'component/View';
import SVGImage from 'component/SVGImage';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import border from 'util/common/border';
import font from 'util/common/font';
import padding from 'util/common/padding';
import {COLORS} from 'util/palette';
import Screen, {rf, rh, rw} from 'util/screen';
//@ts-ignore
import onboardingStep1 from 'asset/svg/onboardingStep1.svg';
//@ts-ignore
import onboardingStep2 from 'asset/svg/onboardingStep2.svg';
import {useOnboardHook} from './onboardHook';

const data = [
  {
    image: onboardingStep1,
    title: 'onboard_screen1_title',
    subTitle: 'onboard_screen1_subTitle',
  },
  {
    image: onboardingStep2,
    title: 'onboard_screen2_title',
    subTitle: 'onboard_screen2_subTitle',
  },
];

const OnboardModalCpn = () => {
  const {scrollRef, theme, onNext} = useOnboardHook();
  return (
    <Modal style={styles.modalContainer} isVisible={true}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        style={{
          height: Screen.height,
          width: Screen.width,
        }}>
        {data.map((item, index) => (
          <View
            key={index}
            h={Screen.height}
            w={Screen.width}
            bg={theme.primary}>
            <View flex={1.3} itemCenter contentCenter>
              <SVGImage Logo={item?.image} height="80%" width={'80%'} />
            </View>
            <View flex={1} itemCenter contentCenter>
              <View mh={rw(70)}>
                <Text
                  lh={rf(25)}
                  mh={rw(8)}
                  ct
                  s={font.superBig}
                  cl={theme.primaryText}
                  fw="bold">
                  {I18nText(item.title)}
                </Text>
                <View h={padding.big} />
                <Text
                  mh={rw(5)}
                  lh={rf(15)}
                  ct
                  s={font.normal}
                  cl={theme.primaryText}>
                  {I18nText(item.subTitle)}
                </Text>
              </View>
              <View h={padding.veryBig} />
              <TouchableOpacity onPress={() => onNext(index)}>
                <ButtonGradient style={styles.linearGradient}>
                  <Text
                    s={rf(20)}
                    fs="normal"
                    fw="bold"
                    cl={theme.buttonTextColor}>
                    {I18nText('Next')}
                  </Text>
                </ButtonGradient>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </Modal>
  );
};

export default OnboardModalCpn;

const styles = StyleSheet.create({
  modalContainer: {margin: 0},
  linearGradient: {
    borderRadius: border.big,
    width: rw(157),
    marginTop: rh(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: rh(10),
  },
  buttonText: {
    textAlign: 'center',
    margin: rw(10),
    backgroundColor: 'transparent',
    fontFamily: 'BentonSans',
    fontSize: rf(16),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: rf(21),
    letterSpacing: 0,
    color: COLORS.WHITE,
  },
});
