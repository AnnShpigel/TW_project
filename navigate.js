import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/login/LoginScreen';
import RegisterScreen from './screens/login/RegisterScreen';
import VerificationScreen from './screens/login/VerificationScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ 
          headerShown: false, // Скрываем шапку для LoginScreen
        }}/>

      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{
        title: '', 
        headerShadowVisible: false, // Убираем разделительную полосу для iOS
        headerStyle: {
        elevation: 0, // Убираем тень/полосу под шапкой для Android
        shadowOpacity: 0, // Также помогает убрать тень под шапкой для iOS
        },
        }}/>

      <Stack.Screen 
        name="Verification" 
        component={VerificationScreen}
        options={{
        title: '', 
        headerShadowVisible: false, // Убираем разделительную полосу для iOS
        headerStyle: {
        elevation: 0, // Убираем тень/полосу под шапкой для Android
        shadowOpacity: 0, // Также помогает убрать тень под шапкой для iOS
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
    </Stack.Navigator>
  );
};

export default AppNavigator;
