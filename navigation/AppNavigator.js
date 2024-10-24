import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/LoginScreen';
import RegisterScreen from '../screens/login/RegisterScreen';
import VerificationScreen from '../screens/login/VerificationScreen';
import ForgotPassScreen from '../screens/login/ForgotPassScreen';
import CreateNewPassScreen from '../screens/login/CreateNewPassScreen';
import CreatedPassScreen from '../screens/login/CreatedPassScreen';
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator();

// Основная навигация по экранам с регистрацией и функцией навигации MainTabNavigator по главному приложению 
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ 
          headerShown: false,
        }}/>

      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{
        title: '', 
        headerShadowVisible: false,
        headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        },
        }}/>

      <Stack.Screen 
        name="Verification" 
        component={VerificationScreen}
        options={{
        title: '', 
        headerShadowVisible: false,
        headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        },
        }}/>

      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPassScreen}
        options={{
        title: '', 
        headerShadowVisible: false, 
        headerStyle: {
        elevation: 0, 
        shadowOpacity: 0, 
        },
        }}/>

      <Stack.Screen 
        name="CreateNewPassScreen" 
        component={CreateNewPassScreen} 
        options={{ 
          headerShown: false,
        }}/>

      <Stack.Screen 
        name="CreatedPassScreen" 
        component={CreatedPassScreen} 
        options={{ 
          headerShown: false,
        }}/>

      <Stack.Screen 
        name="Main"
        component={MainTabNavigator}
        options={{ 
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
};

export default AppNavigator;
