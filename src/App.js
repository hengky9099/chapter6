import {StyleSheet, Alert} from 'react-native';
import React, {useEffect} from 'react';
import Router from './router/Index';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    const unsubscribe = messaging().onMessage(async () => {
      Alert.alert('hello', 'Notification Sended!');
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
    // <View>
    //   <TouchableOpacity onPress={() => crashlytics().crash()}>
    //     <Text>Test</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     onPress={async () =>
    //       await analytics().logEvent('register_account', {
    //         name: 'hengky',
    //       })
    //     }>
    //     <Text>Click me for Analytics</Text>
    //   </TouchableOpacity>
    // </View>
  );
};

export default App;

const styles = StyleSheet.create({});
