import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Image1 from '../../assets/images/RegisterImage.png';
import backIcon from '../../assets/icons/backIcon.png';

const RegisterScreen = ({ navigation }) => {
  

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={{ width: 40, height: 40, marginLeft: 30, marginTop: 100 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleSignUp = () => {
    // Здесь может быть логика валидации формы регистрации или запрос к API
    // Если все хорошо, переходим на VerificationScreen
    navigation.navigate('Verification');
  };

  return (
    <View style={styles.container}>
      <Image source={Image1} style={styles.image} />

      <TextInput
        style={styles.input}
        placeholder="login"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="confirm password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
    width: 300, // Установите подходящий размер
    height: 300, // Установите подходящий размер
    marginBottom: 20,
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
    width: 320,
    height: 45,
    backgroundColor: '#207586',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RegisterScreen;
