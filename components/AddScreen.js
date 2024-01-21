// Импортируем необходимые модули
// useContext позволяет получить текущее значение контекста
// useState позволяет создать и управлять состоянием компонента
import React, { useContext, useState } from 'react';
// Импортируем необходимые компоненты из react-native
// View и Text используются для создания интерфейса
// TextInput используется для ввода текста пользователем
// TouchableOpacity - это компонент, который позволяет обрабатывать нажатия пользователя
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
// Импортируем иконки из @expo/vector-icons
import { AntDesign, FontAwesome } from '@expo/vector-icons';
// Импортируем контекст данных
import { DataContext } from './DataProvider';

// Компонент экрана добавления
const AddScreen = ({ navigation }) => {
  // Получаем текущее значение контекста данных и функцию для его обновления
  const [data, setData] = useContext(DataContext);
  // Создаем состояние для имени и описания пользователя
  const [name, setName] = useState(data.name || '');
  const [description, setDescription] = useState(data.description || '');

  // Функция для перехода к следующему экрану
  const handleNext = () => {
    setData(data);
    navigation.navigate('AddTwo');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.circle} />
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => { setName(text); setData(prev => ({ ...prev, name: text })); }}
          placeholder="Modus"
          placeholderTextColor="gray"
          underlineColorAndroid="transparent"
        />
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        style={styles.textarea}
        value={description}
        onChangeText={text => { setDescription(text); setData(prev => ({ ...prev, description: text })); }}
        placeholder="Текст, описывающий модус"
        placeholderTextColor="gray"
        multiline
        underlineColorAndroid="transparent"
      />
      <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Далее</Text>
      </TouchableOpacity>
    </View>
  );
};

// Определение стилей компонента
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', width: '75%', marginBottom: 20 },
  circle: { width: 35, height: 35, borderRadius: 20, backgroundColor: '#408F9E', marginRight: 10 },
  input: { flex: 1, fontSize: 18, borderBottomWidth: 1, borderBottomColor: 'gray', marginRight: 10 },
  backButton: { position: 'absolute', top: 20, right: 20 },
  textarea: { flex: 1, fontSize: 18, borderBottomWidth: 0, marginTop: 20, padding: 10, width: '100%', height: '80%', marginBottom: 40 },
  nextButton: { width: '30%', height: 40, backgroundColor: '#408F9E', justifyContent: 'center', alignItems: 'center', borderRadius: 20, position: 'absolute', bottom: 10, right: 20 },
  nextButtonText: { color: 'white', fontSize: 18 },
});

export default AddScreen;