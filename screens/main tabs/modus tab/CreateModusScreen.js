import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NextButton from '../../../components/buttons/NextButton';

const CreateModusScreen = () => {
  const [modusName, setModusName] = useState('');
  const [modusDescription, setModusDescription] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    // Ваш код для перехода к следующему экрану и логики сохранения данных
    console.log(modusName, modusDescription);
    // navigation.navigate('NextScreen'); // Убедитесь, что здесь указано правильное имя следующего экрана
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          placeholder="Название"
          value={modusName}
          onChangeText={setModusName}
          style={styles.input}
        />
        <TextInput
          placeholder="Опишите модус"
          value={modusDescription}
          onChangeText={setModusDescription}
          style={styles.textArea}
          multiline
        />
        <NextButton/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center', // Центрируем содержимое
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#207586',
    width: '100%', // Ширина поля по ширине контейнера
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  textArea: {
    borderColor: '#207586',
    borderWidth: 1,
    borderRadius: 10, // Скругление углов
    width: '100%', // Ширина поля по ширине контейнера
    padding: 10,
    fontSize: 18,
    height: 150, // Высота текстового поля
    textAlignVertical: 'top',
    marginBottom: 20,
  },
});

export default CreateModusScreen;
