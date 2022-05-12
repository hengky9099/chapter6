import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import TouchID from 'react-native-touch-id';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {firebaseService, serverToken, webClientIds} from '../../utils/api';

GoogleSignin.configure({
  webClientId: webClientIds,
});

const Index = ({navigation}) => {
  const [email, setEmail] = useState(''); // hengky9909@gmail.com
  const [password, setPassword] = useState(''); // test123123
  const [tokenSession, setToken] = useState('');

  const optionalConfigObject = {
    title: 'Authentication Required',
    color: 'red',
  };

  const BioAuth = () => {
    TouchID.authenticate('Test Bio Auth', optionalConfigObject)
      .then(async () => {
        await analytics().logEvent('Map', {
          name: email,
        });
        alert('Authentication Success!');
        navigation.navigate('Tabs');
      })
      .catch(error => {
        alert('Authentication Failed');
        if (error) crashlytics().crash();
      });
  };

  const auths = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        await analytics().logEvent('Map', {
          name: email,
        });
        BioAuth();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
        crashlytics().crash();
      });
  };

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  const data = {
    email: email,
    password: password,
  };

  return (
    <View>
      <TextInput
        style={styles.value}
        onChangeText={value => setEmail(value)}
        textContentType="emailAddress"
        placeholder="Email"
      />
      <TextInput
        style={styles.value}
        onChangeText={value => setPassword(value)}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginButton} onPress={auths}>
        <Icon
          style={styles.loginButtonIcon}
          name="login"
          size={24}
          color={'white'}
        />
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() =>
          onGoogleButtonPress().then(() => {
            console.log('signed');
            BioAuth();
          })
        }>
        <Icons
          style={styles.googleButtonIcon}
          name="google"
          size={24}
          color={'white'}
        />
        <Text style={styles.googleButtonText}>Login with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.testingButton}
        onPress={async () => {
          const token = await messaging().getToken();
          setToken(token);
          const body = {
            to: tokenSession,
            notification: {
              body: 'new notification',
              title: 'Test',
            },
          };

          const res = await axios.post(`${firebaseService}`, body, {
            headers: {
              Authorization: `Bearer ${serverToken}`,
            },
          });

          console.log(res);
        }}>
        <Text style={styles.testingButtonText}>Testing</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  value: {
    width: moderateScale(280),
    top: moderateScale(250),
    left: moderateScale(35),
    marginBottom: moderateScale(20),
    borderStyle: 'solid',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    borderColor: 'gray',
  },
  loginButton: {
    width: moderateScale(260),
    height: moderateScale(40),
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: moderateScale(10),
    backgroundColor: '#4D96FF',
    left: moderateScale(45),
    top: moderateScale(270),
  },
  loginButtonText: {
    color: 'white',
    left: moderateScale(110),
    top: moderateScale(-12),
  },
  loginButtonIcon: {
    top: moderateScale(10),
    left: moderateScale(15),
  },
  googleButton: {
    width: moderateScale(260),
    height: moderateScale(40),
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: moderateScale(10),
    backgroundColor: 'red',
    left: moderateScale(45),
    top: moderateScale(285),
  },
  googleButtonText: {
    color: 'white',
    left: moderateScale(80),
    top: moderateScale(-12),
  },
  googleButtonIcon: {
    top: moderateScale(10),
    left: moderateScale(15),
  },
  testingButton: {
    width: moderateScale(260),
    height: moderateScale(40),
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: moderateScale(10),
    backgroundColor: '#4D96FF',
    left: moderateScale(45),
    top: moderateScale(320),
  },
  testingButtonText: {
    color: 'white',
    left: moderateScale(110),
    top: moderateScale(-2),
  },
});
