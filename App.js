import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import RegisterScreen from './screens/RegisterScreen';
import IntroSlider from './screens/IntroSlider';
import MainScreen from './screens/Main';
import MyCart from './screens/MyCart';
import FavoriteScreen from './screens/FavoriteScreen';
import PaymentScreen from './screens/Payment';
import NotificationScreen from './screens/Notification'; 
import ProfileScreen from './screens/Profile'; 
import ShoeInfo from './screens/ShoeInfo';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IntroSlider">
        <Stack.Screen name="IntroSlider" component={IntroSlider} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MyCart" component={MyCart} options={{ headerShown: false }} />
        <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ShoeInfo" component={ShoeInfo} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
