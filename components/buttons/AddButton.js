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
        position: 'absolute', 
        right: 40,
        bottom: 40,
    },
    image: {
        width: 70,
        height: 70,
    },
});

export default AddButton;
