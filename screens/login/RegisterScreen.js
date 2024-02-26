import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/inputs/LoginCustomInput';
import CustomButton from '../../components/buttons/LoginCustomButton'; 
import BackButton from '../../components/buttons/BackButton';

import Image1 from '../../assets/images/RegisterImage.png';

const RegisterScreen = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton />,
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

      <CustomInput
        placeholder="login"
        autoCapitalize="none"
        // Добавьте value и onChangeText если используете состояние
      />

      <CustomInput
        placeholder="e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        // Добавьте value и onChangeText если используете состояние
      />

      <CustomInput
        placeholder="password"
        secureTextEntry
        // Добавьте value и onChangeText если используете состояние
      />

      <CustomInput
        placeholder="confirm password"
        secureTextEntry
        // Добавьте value и onChangeText если используете состояние
      />

      <CustomButton
        title="Sign Up"
        onPress={() => navigation.navigate('Verification')}
      />
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
});

export default RegisterScreen;
