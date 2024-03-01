import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/inputs/LoginCustomInput';
import BackButton from '../../components/buttons/BackButton';

const ForgotPassScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(new Array(4).fill(''));
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef(code.map(() => React.createRef()));

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton />,
    });
  }, [navigation]);

  useEffect(() => {
    let timer;
    if (isCodeSent && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCodeSent(false);
      setCountdown(30);
    }
    return () => clearTimeout(timer);
  }, [isCodeSent, countdown]);

  useEffect(() => {
    checkCodeComplete();
  }, [code]);

  const checkCodeComplete = () => {
    if (code.every(singleCode => singleCode.trim() !== '')) {
      navigation.navigate('CreateNewPassScreen');
    }
  };

  const handleSendCode = () => {
    setIsCodeSent(true);
    // Здесь должна быть ваша логика отправки кода на электронную почту
  };

  const handleCodeInput = (text, index) => {
    if (/^\d$/.test(text) || text === '') {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode, () => checkCodeComplete());

    if (text && index < 3) {
      inputRefs.current[index + 1].current.focus();
    }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password?</Text>
      <Text style={styles.subtitle}>
        Please enter the email address linked with your account.
      </Text>

      <CustomInput
        placeholder="Enter your e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isCodeSent}
      />

      {isCodeSent && (
        <View style={styles.codeInputContainer}>
          {code.map((singleCode, index) => (
            <TextInput
              key={index}
              ref={inputRefs.current[index]}
              style={styles.codeInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleCodeInput(text, index)}
              value={singleCode}
              returnKeyType="done"
              autoCompleteType="off" // Отключить автозаполнение
              textContentType="oneTimeCode" // Для iOS, использовать для кода подтверждения
              autoCorrect={false} // Отключить автокоррекцию
            />
          ))}
        </View>
      )}

      <TouchableOpacity
        onPress={handleSendCode}
        disabled={isCodeSent}
        style={isCodeSent ? styles.buttonDisabled : styles.buttonEnabled}
      >
        <Text style={styles.buttonText}>Send code</Text>
      </TouchableOpacity>

      {isCodeSent && (
        <Text style={styles.resendText}>
          Resending is possible after: {countdown} sec
        </Text>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  resendText: {
    fontSize: 16,
    color: 'grey',
  },
  buttonEnabled: {
    width: 320,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#207586',
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonDisabled: {
    width: 320,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
  // Дополнительные стили для CustomInput и CustomButton, если они отличаются от вышеуказанных
});

export default ForgotPassScreen;
