import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NextIconImage from '../../assets/icons/NextButton.png';

const NextButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Image source={NextIconImage} style={styles.image} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        right: 50, // Например, отступ справа
        bottom: 50, // И отступ снизу
    },
    image: {
        width: 60, // Установите нужные размеры для иконки
        height: 60,
    },
});

export default NextButton;
