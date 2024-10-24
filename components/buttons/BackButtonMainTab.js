import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIconImage from '../../assets/icons/BackIcon.png';

const BackButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
            <Image source={BackIconImage} style={styles.image} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginLeft: 15,
        marginTop: 5, 
    },
    image: {
        width: 40,
        height: 40,
    },
});

export default BackButton;
