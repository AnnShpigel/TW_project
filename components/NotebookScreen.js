// Импортируем необходимые модули
// useContext позволяет получить текущее значение контекста
// useState позволяет создать и управлять состоянием компонента
import React, { useContext, useState } from 'react';
// Импортируем необходимые компоненты из react-native
// View и Text используются для создания интерфейса
// TouchableOpacity - это компонент, который позволяет обрабатывать нажатия пользователя
// ScrollView используется для создания прокручиваемого контейнера
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// Импортируем иконки из @expo/vector-icons
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
// Импортируем контекст данных
import { DataContext } from './DataProvider';

// Компонент экрана с шагами
const NotebookScreen = ({ navigation }) => {
  // Получаем текущее значение контекста данных и функцию для его обновления
  const [data, setData] = useContext(DataContext);
  // Создаем состояние для отображения полного описания
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Функция для переключения отображения полного описания
  const handleToggleDescription = () => {
    setShowFullDescription(prev => !prev);
  };

  // Функция для переключения выполнения шага
  const handleToggleStep = (resultKey, stepIndex) => {
    setData(prev => {
      const newCompletedSteps = { ...prev.completedSteps };
      if (!newCompletedSteps[resultKey]) newCompletedSteps[resultKey] = {};
      newCompletedSteps[resultKey][stepIndex] = !newCompletedSteps[resultKey][stepIndex];
      return { ...prev, completedSteps: newCompletedSteps };
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.name}</Text>
      {data.description.length > 150 ? (
        <TouchableOpacity onPress={handleToggleDescription}>
          <Text style={styles.description}>
            {showFullDescription ? data.description : `${data.description.substring(0, 150)}...`}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.description}>{data.description}</Text>
      )}
      <ScrollView style={styles.scrollView}>
        {Object.keys(data.results).map(resultKey => (
          <View key={resultKey} style={styles.resultBlock}>
            <Text style={styles.resultTitle}>{data.results[resultKey]}</Text>
            {data.steps[resultKey]?.map((step, index) => (
              <View key={index} style={styles.stepContainer}>
                <View style={styles.circle} />
                <Text style={styles.stepText}>{step}</Text>
                <TouchableOpacity onPress={() => handleToggleStep(resultKey, index)}>
                  <MaterialIcons name={data.completedSteps?.[resultKey]?.[index] ? "check-box" : "check-box-outline-blank"} size={24} color="black" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
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
  description: { marginBottom: 20 },
  scrollView: { width: '100%', paddingRight: 20 },
  resultBlock: { borderWidth: 1, borderRadius: 10, padding: 10, marginBottom: 20 },
  resultTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  stepContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 20 },
  circle: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#408F9E', marginRight: 10 },
  stepText: { flex: 1, fontSize: 18 },
  backButton: { position: 'absolute', top: 20, right: 20 },
});

export default NotebookScreen;
