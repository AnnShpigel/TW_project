import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import CustomInput from '../../components/inputs/LoginCustomInput'; 
import CustomButton from '../../components/buttons/LoginCustomButton'; 

import Image1 from '../../assets/images/LoginImage.png';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <Image source={Image1} style={styles.image} />

    <CustomInput
        placeholder="login/e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        // Добавьте value и onChangeText если используете состояние
      />

      <CustomInput
        placeholder="password"
        secureTextEntry // Делает текст в поле невидимым
        // Добавьте value и onChangeText если используете состояние
      />

      <CustomButton
        title="Log In"
        onPress={() => navigation.navigate('Main')}
      />

      <CustomButton
        title="Sign Up"
        onPress={() => navigation.navigate('Register')}
      />

      {/* Тонкая линия */}
      <View style={styles.lineStyle}></View>

      {/* Ссылка "Забыли пароль?" */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot password</Text>
      </TouchableOpacity>
    </View>
  );
};

// Стили компонента
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#207586',
    marginTop: 15,
    fontSize: 14,
  },
  lineStyle: {
    borderWidth: 0.1,
    borderColor: '#ebebeb',
    width: '120%',
    marginTop: 15,
  },
});

export default LoginScreen;
