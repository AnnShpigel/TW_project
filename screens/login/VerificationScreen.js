import React, { useState, useRef, createRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomButton from '../../components/buttons/LoginCustomButton';
import BackButton from '../../components/buttons/BackButton';

const VerificationScreen = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([createRef(), createRef(), createRef(), createRef()]);

  const handleCodeInput = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>
        Enter the verification code we just sent on your email address.
      </Text>

      <CustomButton title="Verify" onPress={() => {/* Логика верификации */}} />
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default VerificationScreen;
