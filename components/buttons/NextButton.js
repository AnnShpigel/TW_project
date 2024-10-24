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
        right: 42,
        bottom: 42,
    },
    image: {
        width: 65, 
        height: 65,
    },
});

export default NextButton;
