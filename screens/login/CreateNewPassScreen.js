import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/inputs/LoginCustomInput';
import CustomButton from '../../components/buttons/LoginCustomButton';
import BackButton from '../../components/buttons/BackButton';

const CreateNewPassScreen = () => {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    // TODO: Add password reset logic here
    if (newPassword === confirmPassword) {
      navigation.navigate('CreatedPassScreen');
    } else {
      // Handle password mismatch
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create new password</Text>
      <Text style={styles.subtitle}>
        Your new password must be unique from those previously used.
      </Text>
      <CustomInput
        placeholder="new password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <CustomInput
        placeholder="confirm password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <CustomButton title="Reset password" onPress={handleResetPassword} />
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
  });

export default CreateNewPassScreen;
