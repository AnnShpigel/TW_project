import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import CustomInput from '../../components/inputs/LoginCustomInput'; 
import CustomButton from '../../components/buttons/LoginCustomButton'; 

import Image1 from '../../assets/images/LoginImage.png';

// Экран авторизации
// Добавить проверку на соответствие данных в БД
const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <Image source={Image1} style={styles.image} />

    <CustomInput
        placeholder="login/e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <CustomInput
        placeholder="password"
        secureTextEntry
      />

      <CustomButton
        title="Log In"
        onPress={() => navigation.navigate('Main')}
      />

      <CustomButton
        title="Sign Up"
        onPress={() => navigation.navigate('Register')}
      />

      <View style={styles.lineStyle}></View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot password</Text>
      </TouchableOpacity>
    </View>
  );
};

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
