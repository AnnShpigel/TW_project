// Импортируем необходимые модули
// useContext позволяет получить текущее значение контекста
// useState позволяет создать и управлять состоянием компонента
// useEffect позволяет выполнять побочные эффекты в функциональных компонентах
import React, { useContext, useState, useEffect } from 'react';
// Импортируем необходимые компоненты из react-native
// View и Text используются для создания интерфейса
// TextInput используется для ввода текста пользователем
// TouchableOpacity - это компонент, который позволяет обрабатывать нажатия пользователя
// ScrollView используется для создания прокручиваемого контейнера
// Dimensions используется для получения размеров окна устройства
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
// Импортируем иконки из @expo/vector-icons
import { AntDesign, Entypo } from '@expo/vector-icons';
// Импортируем контекст данных
import { DataContext } from './DataProvider';

// Компонент экрана добавления
const AddTwoScreen = ({ navigation }) => {
  // Получаем текущее значение контекста данных и функцию для его обновления
  const [data, setData] = useContext(DataContext);
  // Создаем состояние для результатов пользователя
  const [results, setResults] = useState(data.results || ['']);
  // Создаем состояние для размера шрифта
  const [fontSize, setFontSize] = useState(16);

   // Используем useEffect для обновления размера шрифта при изменении размеров окна
  useEffect(() => {
    const updateFont = () => {
      const { width } = Dimensions.get('window');
      setFontSize(Math.min(16, width / 20));
    };

    Dimensions.addEventListener('change', updateFont);
    return () => Dimensions.removeEventListener('change', updateFont);
  }, []);

  // Используем useEffect для обновления контекста данных при изменении результатов
  useEffect(() => {
    setData(prev => ({ ...prev, results }));
  }, [results]);

  // Функция для перехода к следующему экрану
  const handleNext = () => {
    navigation.navigate('AddThree');
  };

  // Функция для добавления нового результата
  const handleAdd = () => {
    setResults(prev => [...prev, '']);
  };

  // Функция для обновления результата
  const handleChange = (text, index) => {
    setResults(prev => {
      const newResults = [...prev];
      newResults[index] = text;
      return newResults;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Создание ленты развития</Text>
      <Text style={[styles.subtitle, { fontSize }]} numberOfLines={1}>Опишите результаты, к которому хотите прийти</Text>
      <ScrollView style={styles.scrollView}>
        {results.map((result, index) => (
          <View key={index} style={styles.inputContainer}>
            <View style={styles.circle} />
            <TextInput
              style={styles.input}
              value={result}
              onChangeText={text => handleChange(text, index)}
              placeholder="Результат"
              placeholderTextColor="gray"
              underlineColorAndroid="transparent"
            />
          </View>
        ))}
        <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
          <Entypo name="plus" size={24} color="black" />
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Далее</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

// Определение стилей компонента
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { marginBottom: 20 },
  scrollView: { width: '100%', paddingRight: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 20 },
  circle: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#408F9E', marginRight: 10 },
  input: { flex: 1, fontSize: 18, borderWidth: 1, borderColor: 'gray', borderRadius: 10, padding: 10 },
  addButton: { alignSelf: 'center', marginBottom: 20 },
  nextButton: { width: '30%', height: 40, backgroundColor: '#408F9E', justifyContent: 'center', alignItems: 'center', borderRadius: 20, position: 'absolute', bottom: 10, right: 20 },
  nextButtonText: { color: 'white', fontSize: 18 },
  backButton: { position: 'absolute', top: 20, right: 20 },
});

export default AddTwoScreen;
