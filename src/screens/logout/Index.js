import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Index = ({navigation}) => {
  const signOut = async () => {
    try {
      console.log('success');
      await GoogleSignin.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text style={styles.logoutText}>Log Out</Text>
      <TouchableOpacity style={styles.logoutIcon} onPress={signOut}>
        <Icon name="logout" size={160} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  logoutText: {
    fontSize: moderateScale(30),
    color: 'black',
    left: moderateScale(115),
    top: moderateScale(140),
  },
  logoutIcon: {
    left: moderateScale(100),
    top: moderateScale(200),
  },
});
