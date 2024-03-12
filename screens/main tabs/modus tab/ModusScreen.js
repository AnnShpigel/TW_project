import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // Не забудьте импортировать useNavigation
import AddButton from '../../../components/buttons/AddButton';

const ModusScreen = () => {
  const navigation = useNavigation();

  const goToCreateModusScreen = () => {
      navigation.navigate('CreateModusScreen');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Здесь ваш код для основного поля для модусов... */}
      <View style={styles.modusContainer}>
        {/* Модусы будут добавлены сюда */}
      </View>
      {/* Используем компонент AddButton */}
      <AddButton onPress={goToCreateModusScreen} />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#207586', // Цвет шапки
    alignItems: 'center',
    justifyContent: 'center',
  },
  modusContainer: {
    flex: 1,
    backgroundColor: '#fff', // Цвет фона основного поля
  },
});

export default ModusScreen;
