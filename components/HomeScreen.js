// Импортируем необходимые модули
// useContext позволяет получить текущее значение контекста
import React, { useContext } from 'react';
// Импортируем необходимые компоненты из react-native
// View и Text используются для создания интерфейса
import { View, Text } from 'react-native';
// Импортируем иконки из @expo/vector-icons
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
// TouchableOpacity - это компонент, который позволяет обрабатывать нажатия пользователя
import { TouchableOpacity } from 'react-native';
// Импортируем контекст данных
import { DataContext } from './DataProvider';

// Компонент домашнего экрана
const HomeScreen = ({ navigation }) => {
  // Получаем текущее значение контекста данных
  const [data] = useContext(DataContext);
  // Создаем состояние для имени пользователя
  const title = data.name || 'Modus';
  // Проверяем, есть ли данные
  const hasData = !!data.name;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {hasData && (
        // Если есть данные, отображаем кнопку для перехода к записной книжке
        <TouchableOpacity onPress={() => navigation.navigate('Notebook')} style={{ position: 'absolute', top: 20, left: 20 }}>
          <MaterialCommunityIcons name="note-text" size={34} color="grey" />
        </TouchableOpacity>
      )}
      <View style={{ backgroundColor: '#408F9E', width: 100, height: 100, borderRadius: 50, margin: 20 }} />
      <Text style={{ fontSize: 30 }}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Add')} style={{ position: 'absolute', bottom: 20, right: 20 }}>
        {hasData ? <MaterialCommunityIcons name="circle-edit-outline" size={45} color="grey" /> : <MaterialIcons name="add-circle-outline" size={45} color="grey" />}
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

