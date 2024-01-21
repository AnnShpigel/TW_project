import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from "./components/Profile";
import NotebookScreen from './components/NotebookScreen';
import AddScreen from './components/AddScreen';
import AddTwoScreen from './components/AddTwoScreen';
import AddThreeScreen from './components/AddThreeScreen';
import FinalScreen from './components/FinalScreen';
import HomeScreen from './components/HomeScreen';

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();
  

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Notebook" component={NotebookScreen} />
    <HomeStack.Screen name="Add" component={AddScreen} />
    <HomeStack.Screen name="AddTwo" component={AddTwoScreen} />
    <HomeStack.Screen name="AddThree" component={AddThreeScreen} />
    <HomeStack.Screen name="Final" component={FinalScreen} />
  </HomeStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const TAB_ICON = {
    Modus: 'circle',
    Profile: 'user',
  };

const createScreenOptions = ({ route, navigation }) => {
    const iconName = TAB_ICON[route.name];
  
    return {
      tabBarIcon: ({ size, color }) => (
        <FontAwesome name={iconName} size={size} color={color} />
      ),
      tabBarItemStyle: {backgroundColor: '#d7d9d9'}
    };
  };

export default function Navigate() {
  return (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={createScreenOptions}
            tabBarOptions={{
                activeTintColor: '#408F9E',
                showLabel: false, // Additionally, set showLabel prop of tabBarOptions to false
            }}
        >
        <Tab.Screen 
            name="Modus" 
            component={HomeStackScreen}
            options={{
                title: 'Модус',
                headerStyle: { backgroundColor: '#408F9E' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
                headerTitleAlign: 'center',
            }}
        />
        <Tab.Screen 
            name="Profile" 
            component={Profile}
            options={{
                title: 'Профиль',
                headerStyle: { backgroundColor: '#408F9E' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
                headerTitleAlign: 'center',
            }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}