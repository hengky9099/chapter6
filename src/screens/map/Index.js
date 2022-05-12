import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import crashlytics from '@react-native-firebase/crashlytics';

import Geolocation from '@react-native-community/geolocation';

import MapView, {Marker} from 'react-native-maps';

Geolocation.setRNConfiguration({
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 10000,
});

const Index = () => {
  const [position, setPosition] = useState({});
  const requestPermissions = React.useCallback(async () => {
    const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        break;
      case RESULTS.DENIED:
        const resRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }
  }, []);

  useEffect(() => {
    crashlytics().log('map error');
    requestPermissions();
  }, [requestPermissions]);

  Geolocation.getCurrentPosition(info => {
    setPosition({
      lat: info.coords.latitude,
      long: info.coords.longitude,
    });
  });

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: position.lat,
        longitude: position.long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      <Marker coordinate={{latitude: position.lat, longitude: position.long}} />
    </MapView>
  );
};

export default Index;

const styles = StyleSheet.create({
  map: {
    width: 360,
    height: 670,
  },
});
