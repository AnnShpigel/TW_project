import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ModusScreen from '../screens/main tabs/modus tab/ModusScreen';
import CreateModusScreen from '../screens/main tabs/modus tab/CreateModusScreen';
import AddModusesScreen from '../screens/main tabs/modus tab/AddModusesScreen';
import GoalsModusScreen from '../screens/main tabs/modus tab/GoalsModusScreen';
import ActivitiesModusScreen from '../screens/main tabs/modus tab/ActivitesModusScreen';
import ProfileScreen from '../screens/main tabs/profile tab/ProfileScreen';

import ModusIcon from '../assets/icons/NavigationModus.png';
import ProfileIcon from '../assets/icons/NavigationProfile.png';

const Tab = createBottomTabNavigator();
const ModusStack = createStackNavigator();
const ProfileStack = createStackNavigator();

// Компонент стек-навигатора для вкладки Modus
function ModusStackNavigator() {
    return (
      <ModusStack.Navigator>
        <ModusStack.Screen
          name="ModusScreen"
          component={ ModusScreen }
          options={{
            title: 'Модус',
            headerStyle: {
              elevation: 5,
              shadowOpacity: 0.5,
              shadowOffset: { width: 0, height: 1 },
              shadowRadius: 4,
            },
            headerTitleStyle: {
              marginLeft: 30,
              marginBottom: 0,
            },
            headerShadowVisible: true,
            headerLeft: () => null,
          }}
        />
        <ModusStack.Screen
          name="CreateModusScreen"
          component={ CreateModusScreen }
          options={{
            title: 'Создание модуса',
            headerStyle: {
              elevation: 5,
              shadowOpacity: 0.5,
              shadowOffset: { width: 0, height: 1 },
              shadowRadius: 4,
            },
            headerTitleStyle: {
              marginLeft: 10,
              marginBottom: 0,
            },
            headerShadowVisible: true,
          }}
        />
        <ModusStack.Screen
          name="AddModusesScreen"
          component={ AddModusesScreen }
          options={{
            title: 'Дополнение модуса',
            headerStyle: {
              elevation: 5,
              shadowOpacity: 0.5,
              shadowOffset: { width: 0, height: 1 },
              shadowRadius: 4,
            },
            headerTitleStyle: {
              marginLeft: 10,
              marginBottom: 0,
            },
            headerShadowVisible: true,
          }}
        />
        <ModusStack.Screen
          name="GoalsModusScreen"
          component={ GoalsModusScreen }
          options={{
            title: 'Формирование целей',
            headerStyle: {
              elevation: 5,
              shadowOpacity: 0.5,
              shadowOffset: { width: 0, height: 1 },
              shadowRadius: 4,
            },
            headerTitleStyle: {
              marginLeft: 10,
              marginBottom: 0,
            },
            headerShadowVisible: true,
          }}
        />
        <ModusStack.Screen
          name="ActivitiesModusScreen"
          component={ ActivitiesModusScreen }
          options={{
            title: 'Формирование шагов',
            headerStyle: {
              elevation: 5,
              shadowOpacity: 0.5,
              shadowOffset: { width: 0, height: 1 },
              shadowRadius: 4,
            },
            headerTitleStyle: {
              marginLeft: 10,
              marginBottom: 0,
            },
            headerShadowVisible: true,
          }}
        />
      </ModusStack.Navigator>
    );
  }

  // Компонент стек-навигатора для вкладки Профиль
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileHome"
        component={ ProfileScreen }
        options={{
          title: 'Профиль',
          headerStyle: {
            elevation: 5,
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 4,
          },
          headerTitleStyle: {
            marginLeft: 30,
            marginBottom: 0,
          },
          headerShadowVisible: true,
          headerLeft: () => null,
        }}
      />
    </ProfileStack.Navigator>
  );
}

// Основной навигатор с вкладками
export default function MainTabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Modus"
        component={ ModusStackNavigator }
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image source={ModusIcon} style={{ width: 43, height: 43, tintColor: focused ? null : 'gray' }} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ ProfileStackNavigator }
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image source={ProfileIcon} style={{ width: 34, height: 34, tintColor: focused ? null : 'gray' }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
