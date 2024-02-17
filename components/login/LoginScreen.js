import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';

import Image1 from '../../assets/images/LoginImage.png';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <Image source={Image1} style={styles.image} />

      {/* Поле ввода для email */}
      <TextInput
        style={styles.input}
        placeholder="login/e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Поле ввода для пароля */}
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry // Делает текст в поле невидимым
      />

      {/* Кнопка входа */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Кнопка регистрации */}
      <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('Register')}
      >
       <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Тонкая линия */}
      <View style={styles.lineStyle}></View>

      {/* Ссылка "Забыли пароль?" */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password</Text>
      </TouchableOpacity>
    </View>
  );
};

// Стили компонента
const styles = StyleSheet.create({
  container: {
    flex: 1, // Занимает всё доступное пространство
    alignItems: 'center', // Центрирует содержимое по горизонтали
    justifyContent: 'center', // Центрирует содержимое по вертикали
    padding: 20,
    backgroundColor: '#fff', // Белый фоновый цвет
  },

  image: {
    width: 300, // Укажите подходящий размер
    height: 300, // Укажите подходящий размер
    marginRight: 10, // Отступ между изображениями
  },

  input: {
    width: 320, // Ширина поля ввода 100% относительно родителя
    height: 45, // Высота поля ввода
    padding: 10, // Внутренний отступ поля ввода
    marginBottom: 15, // Отступ снизу
    borderWidth: 1, // Толщина границы
    borderColor: '#ccc', // Цвет границы
    borderRadius: 30, // Скругление углов границы
  },
  button: {
    width: 320, // Ширина кнопки 100% относительно родителя
    height: 45, // Высота кнопки
    backgroundColor: '#207586', // Фоновый цвет кнопки
    alignItems: 'center', // Центрирует текст кнопки по горизонтали
    justifyContent: 'center', // Центрирует текст кнопки по вертикали
    borderRadius: 30, // Скругление углов кнопки
    marginBottom: 15, // Отступ снизу
  },
  buttonText: {
    color: '#fff', // Цвет текста кнопки
    fontSize: 16, // Размер шрифта текста кнопки
  },
  forgotPassword: {
    color: '#207586', // Цвет текста "Забыли пароль?"
    fontSize: 14,
    marginTop: 15, // Отступ сверху
  },
  lineStyle: {
    borderWidth: 0.1,
    borderColor: '#ebebeb',
    width: '120%', // Или другой процент/значение, подходящее для вашего дизайна
    marginTop: 15, // Добавляет отступ сверху и снизу
  },
});

export default LoginScreen;
