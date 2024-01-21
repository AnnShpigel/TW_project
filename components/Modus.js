import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <TouchableOpacity onPress={() => navigation.navigate('Notebook')} style={{ position: 'absolute', top: 20, left: 20 }}>
      <MaterialCommunityIcons name="note-text" size={24} color="grey" />
    </TouchableOpacity>
    <View style={{ backgroundColor: '#408F9E', width: 100, height: 100, borderRadius: 50, margin: 20 }} />
    <Text style={{ fontSize: 30 }}>Modus</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Add')} style={{ position: 'absolute', bottom: 20, right: 20 }}>
      <MaterialIcons name="add-circle-outline" size={24} color="black" />
    </TouchableOpacity>
  </View>
);

const NotebookScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 20, right: 20 }}>
      <AntDesign name="back" size={24} color="black" />
    </TouchableOpacity>
    <Text>Notebook Screen</Text>
  </View>
);

const AddScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 20, right: 20 }}>
      <AntDesign name="back" size={24} color="black" />
    </TouchableOpacity>
    <Text>Add Screen</Text>
  </View>
);

const Modus = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notebook" component={NotebookScreen} />
      <Stack.Screen name="Add" component={AddScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Modus;
