import React from 'react';
import {StatusBar as StatusBarRN, StyleSheet} from 'react-native';
import {useChooseTheme} from 'hook/app/appHook';
import View from 'component/View';

type Props = {height?: number};

const StatusBar = ({height = 47}: Props) => {
  const {isDarkMode} = useChooseTheme();
  console.log('isDark mode', isDarkMode);
  return (
    <>
      {/* <View h={47}>
        <View h={height} bg={'green'} style={styles.container}>
          <StatusBarRN translucent barStyle={'dark-content'} />
        </View>
      </View> */}
      <View h={height} bg={'green'} style={styles.container} />
      <StatusBarRN
        translucent
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    height: 47,
    left: 0,
    right: 0,
    position: 'absolute',
    top: 0,
  },
});

export default StatusBar;
