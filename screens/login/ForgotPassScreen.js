import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/inputs/LoginCustomInput';
import CustomButton from '../../components/buttons/LoginCustomButton'; 
import BackButton from '../../components/buttons/BackButton';

const ForgotPassScreen = () => {
    const navigation = useNavigation();
  
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => <BackButton />,
      });
    }, [navigation]);
    };

    return (
    <View style={styles.container}>

        <CustomInput
            placeholder="e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            // Добавьте value и onChangeText если используете состояние
        />
    
        <CustomButton
            title="Send code"
            onPress={() => navigation.navigate('Verification')}
        />
    </View>
    );

    export default ForgotPassScreen;