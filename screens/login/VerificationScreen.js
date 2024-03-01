import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/buttons/LoginCustomButton';
import BackButton from '../../components/buttons/BackButton';

const VerificationScreen = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState(new Array(4).fill(''));
  const inputRefs = useRef(code.map(() => React.createRef()));

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton />,
    });
  }, [navigation]);

  const handleCodeInput = (text, index) => {
    if (/^\d$/.test(text) || text === '') { 
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>
        Enter the verification code we just sent on your email address.
      </Text>

      <View style={styles.codeInputContainer}>
        {code.map((_, index) => (
          <TextInput
            key={index}
            ref={(el) => inputRefs.current[index] = el}
            style={styles.codeInput}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleCodeInput(text, index)}
            value={code[index]}
            returnKeyType="done"
            autoCompleteType="off" // Отключить автозаполнение
            textContentType="oneTimeCode" // Для iOS, использовать для кода подтверждения
            autoCorrect={false} // Отключить автокоррекцию
          />
        ))}
      </View>

      <CustomButton title="Verify" onPress={() => {/* Логика верификации */}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    width: '80%', 
  },
  codeInput: {
    width: '15%', 
    aspectRatio: 1, 
    borderBottomWidth: 2,
    borderColor: '#207586',
    textAlign: 'center',
    fontSize: 22,
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default VerificationScreen;
