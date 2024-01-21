import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FinalScreen = ({ navigation }) => (
  <View style={styles.container}>
    <MaterialCommunityIcons name="robot-happy-outline" size={100} color="gray" />
    <Text style={styles.text}>Поздравляем, вы создали модус!</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
      <Text style={styles.buttonText}>Готово</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 24, marginBottom: 20 },
  button: { width: '30%', height: 40, backgroundColor: '#408F9E', justifyContent: 'center', alignItems: 'center', borderRadius: 20, position: 'absolute', bottom: 10, right: 20 },
  buttonText: { color: 'white', fontSize: 18 },
});

export default FinalScreen;

