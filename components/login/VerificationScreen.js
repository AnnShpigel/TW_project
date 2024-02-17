import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';

import backIcon from '../../assets/icons/backIcon.png';

const VerificationScreen = ({ navigation }) => {
  // Предположим, что у вас есть 4 поля для ввода кода верификации
  const [code, setCode] = useState(['', '', '', '']);

  const handleCodeInput = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    // Перемещение фокуса на следующий TextInput, если текст не пустой
    if (text && index < 3) {
      this[`input${index + 1}`].focus();
    }
  };

  return (
    <View style={styles.container}>
      {/* Кнопка "назад" */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <Image source={backIcon} style={{ width: 40, height: 40, marginLeft: 30, marginTop: 100 }} />
      </TouchableOpacity>

      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>
        Enter the verification code we just sent on your email address.
      </Text>

      {/* Контейнер для полей ввода кода */}
      <View style={styles.codeInputContainer}>
        {code.map((_, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleCodeInput(text, index)}
            ref={(input) => {
              this[`input${index}`] = input;
            }}
          />
        ))}
      </View>

      {/* Кнопка "Verify" */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Изменено на flex-start для верхнего выравнивания
    paddingTop: 60, // Отступ сверху
    backgroundColor: '#fff',
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  codeInputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  codeInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#207586', // Цвет кнопки
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default VerificationScreen;
