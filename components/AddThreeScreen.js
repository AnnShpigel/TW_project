// Импортируем необходимые модули
// useContext позволяет получить текущее значение контекста
// useState позволяет создать и управлять состоянием компонента
import React, { useContext, useState } from 'react';
// Импортируем необходимые компоненты из react-native
// View и Text используются для создания интерфейса
// TextInput используется для ввода текста пользователем
// TouchableOpacity - это компонент, который позволяет обрабатывать нажатия пользователя
// ScrollView используется для создания прокручиваемого контейнера
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// Импортируем иконки из @expo/vector-icons
import { AntDesign, Entypo } from '@expo/vector-icons';
// Импортируем контекст данных
import { DataContext } from './DataProvider';

// Компонент экрана добавления шагов
const AddThreeScreen = ({ navigation }) => {
  // Получаем текущее значение контекста данных и функцию для его обновления
  const [data, setData] = useContext(DataContext);
  // Создаем состояние для шагов пользователя
  const [steps, setSteps] = useState(data.steps || {});

  // Функция для перехода к следующему экрану
  const handleNext = () => {
    setData(prev => ({ ...prev, steps }));
    navigation.navigate('Final');
  };

  // Функция для добавления нового шага
  const handleAdd = (key) => {
    setSteps(prev => {
      const newSteps = { ...prev };
      if (!newSteps[key]) newSteps[key] = [''];
      else newSteps[key].push('');
      return newSteps;
    });
  };

  // Функция для обновления шага
  const handleChange = (text, key, index) => {
    setSteps(prev => {
      const newSteps = { ...prev };
      newSteps[key][index] = text;
      return newSteps;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Создание ленты развития</Text>
      <Text style={styles.subtitle}>Опишите шаги, которые нужно совершить для достижения результата.</Text>
      <ScrollView style={styles.scrollView}>
        {Object.keys(data.results).map((key) => (
          <View key={key} style={styles.block}>
            <Text style={styles.blockTitle}>{data.results[key]}</Text>
            {steps[key]?.map((step, index) => (
              <View key={index} style={styles.inputContainer}>
                <View style={styles.circle} />
                <TextInput
                  style={styles.input}
                  value={step}
                  onChangeText={text => handleChange(text, key, index)}
                  placeholder="Шаг"
                />
              </View>
            ))}
            <TouchableOpacity onPress={() => handleAdd(key)} style={styles.addButton}>
              <Entypo name="plus" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Сохранить</Text>
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
  block: { borderWidth: 1, borderRadius: 10, padding: 10, marginBottom: 20 },
  blockTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 20 },
  circle: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#408F9E', marginRight: 10 },
  input: { flex: 1, fontSize: 18, borderWidth: 1, borderColor: 'gray', borderRadius: 10, padding: 10 },
  addButton: { alignSelf: 'center', marginBottom: 20 },
  nextButton: { width: '30%', height: 40, backgroundColor: '#408F9E', justifyContent: 'center', alignItems: 'center', borderRadius: 20, position: 'absolute', bottom: 10, right: 20 },
  nextButtonText: { color: 'white', fontSize: 18 },
  backButton: { position: 'absolute', top: 20, right: 20 },
});

export default AddThreeScreen;
