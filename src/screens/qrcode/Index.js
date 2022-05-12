import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {CameraScreen, CameraType} from 'react-native-camera-kit';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

const Index = ({navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    crashlytics().log('qr code error');
    analytics().logEvent('QR_Code', {
      name: 'qr_code',
    });
  });

  return isFocused ? (
    <CameraScreen
      CameraType={CameraType.Back}
      onReadCode={event => Alert.alert(event.nativeEvent.codeStringValue)}
      scanBarcode={true}
      showFrame={true}
      laserColor="red"
      frameColor="white"
      // navigation.navigate('QRCodeScanned')
    />
  ) : null;
};

export default Index;

const styles = StyleSheet.create({});
