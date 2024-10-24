import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const GoalsAndActivitiesInputs = ({ placeholder, secureTextEntry, keyboardType, autoCapitalize, value, onChangeText }) => {
    return (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        value={value}
        onChangeText={onChangeText}
      />
    );
  };
  
  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      width: '90%',
      height: 35,
      padding: 10,
      marginBottom: 5,
      marginLeft: 5,
      borderWidth: 1,
      borderColor: '#207586',
      borderRadius: 30,
    },
  });

export default GoalsAndActivitiesInputs;
