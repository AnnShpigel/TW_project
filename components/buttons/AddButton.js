import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddIconImage from '../../assets/icons/AddButton.png';

const AddButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Image source={AddIconImage} style={styles.image} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute', // Абсолютное позиционирование для размещения в любом месте экрана
        right: 50, // Например, отступ справа
        bottom: 50, // И отступ снизу
    },
    image: {
        width: 53, // Установите нужные размеры для иконки
        height: 53,
    },
});

export default AddButton;
