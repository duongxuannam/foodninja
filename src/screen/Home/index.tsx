/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  NativeModules,
  Button,
} from 'react-native';

import {
  Colors,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const testConnectNative = NativeModules.ExampleNative;

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <Text>MainApp</Text>
            <Button
              title="go app"
              onPress={() => {
                testConnectNative.navigateInMiniApp('miniApp', 'MiniApp');
              }}
            />
            <Button
              title="go appp"
              onPress={() => {
                testConnectNative.navigateInMiniApp('miniAppp', 'MiniAppp');
              }}
            />
            <TouchableOpacity onPress={() => {}}>
              <Image
                style={[
                  {
                    width: 40,
                    aspectRatio: 1,
                    height: undefined,
                  },
                ]}
                // resizeMode="cover"
                // source={require('asset/png/avatar.png')}
                source={require('../../../assets_mini/close.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Image
                style={[
                  {
                    width: 40,
                    aspectRatio: 1,
                    height: undefined,
                  },
                ]}
                // resizeMode="cover"
                source={require('asset/png/avatar.png')}
                // source={require('../../../assets_mini/close.png')}
              />
            </TouchableOpacity>
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
