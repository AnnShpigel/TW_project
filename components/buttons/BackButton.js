import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import BackIcon from '../../assets/icons/BackIcon.png'; // Убедитесь, что путь к изображению верный

const BackButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Image source={BackIcon} style={styles.image} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginLeft: 30,
        marginTop: 100, // Это может быть слишком большой отступ сверху, рассмотрите возможность его уменьшения
    },
    image: {
        width: 40,
        height: 40,
    },
});

export default BackButton; // Исправлено здесь
