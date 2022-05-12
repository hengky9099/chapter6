import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../screens/login/Index';
import Map from '../screens/map/Index';
import QRCode from '../screens/qrcode/Index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Logout from '../screens/logout/Index';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Map" component={Map} options={{headerShown: false}} />
      <Stack.Screen
        name="QRCode"
        component={QRCode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? 'red' : 'black'}}>Google Map</Text>
          ),
          tabBarIcon: ({focused, color}) => (
            <Icon name="place" size={24} color={focused ? 'red' : 'black'} />
          ),
        }}
        name="Map"
        component={Map}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? 'red' : 'black'}}>QR Code</Text>
          ),
          tabBarIcon: ({focused, color}) => (
            <Icon name="qr-code" size={24} color={focused ? 'red' : 'black'} />
          ),
        }}
        name="QRCode"
        component={QRCode}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? 'red' : 'black'}}>Logout</Text>
          ),
          tabBarIcon: ({focused, color}) => (
            <Icon name="logout" size={24} color={focused ? 'red' : 'black'} />
          ),
        }}
        name="Logout"
        component={Logout}
      />
    </Tab.Navigator>
  );
};

export default Stacks;

const styles = StyleSheet.create({});
