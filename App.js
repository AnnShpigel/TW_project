import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { ModusProvider } from './ModusContext'; 

export default function App() {
  return (
    // Обёртка приложения для записи данных в контекст
    <ModusProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ModusProvider>
  );
}
