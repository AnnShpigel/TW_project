import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ModusScreen from '../screens/main tabs/modus tab/ModusScreen';
import CreateModusScreen from '../screens/main tabs/modus tab/CreateModusScreen';
import ProfileScreen from '../screens/main tabs/profile tab/ProfileScreen';

const Tab = createBottomTabNavigator();
const ModusStack = createStackNavigator();

// Компонент стек-навигатора для вкладки Modus
function ModusStackNavigator() {
    return (
      <ModusStack.Navigator>
        <ModusStack.Screen
          name="ModusHome"
          component={ModusScreen}
          options={{ headerShown: false }}
        />
        <ModusStack.Screen
          name="CreateModusScreen"
          component={CreateModusScreen}
          options={{ headerTitle: 'Создание модуса' }}
        />
      </ModusStack.Navigator>
    );
  }

// Основной навигатор с вкладками
export default function MainTabNavigator() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Modus"
          component={ModusStackNavigator} // Здесь используется стек навигации
          options={{  }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ /* конфигурация вкладки */ }}
        />
        {/* ...другие вкладки, если они есть... */}
      </Tab.Navigator>
    );
  }
