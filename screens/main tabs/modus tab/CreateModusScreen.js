import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useModusContext } from '../../../ModusContext';
import NextButton from '../../../components/buttons/NextButton';
import BackButtonMainTab from '../../../components/buttons/BackButtonMainTab';

// Компонент для создания нового модуса
const CreateModusScreen = () => {
  const [modusName, setModusName] = useState('');
  const [modusDescription, setModusDescription] = useState('');
  const { addModus } = useModusContext();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButtonMainTab />
    });
  }, [navigation]);

  // После нажатия на кнопку "далее" модус записывается в контекст, это добавляет баг создания модуса каждый раз при нажатии
  // Необходимо отвязать и реализовать другую логику сохранения
  const handleNext = () => {
    const newModus = { id: Date.now().toString(), name: modusName, description: modusDescription, parentId: null };
    addModus(newModus);
    navigation.navigate('AddModusesScreen'); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.description}>Создайте и опишите основной модус, это будет стартовой точкого на пути к росту!</Text>
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
        <NextButton onPress={handleNext}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  description: {
    color: 'gray',
    textAlign: 'center',
    padding: 10,
    marginTop: 30
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#207586',
    width: '100%',
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  textArea: {
    borderColor: '#207586',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    padding: 10,
    fontSize: 18,
    height: 150,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
});

export default CreateModusScreen;
