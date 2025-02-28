import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from './../../../UserContext';
import BackButtonMainTab from '../../../components/buttons/BackButtonMainTab';
import SaveButton from '../../../components/buttons/SaveButton';

const UserInfoScreen = () => {
    const { user, updateUser } = useUserContext();
    const navigation = useNavigation();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [avatar, setAvatar] = useState(user?.avatar || null);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <BackButtonMainTab />,
        });
    }, [navigation]);

    const handleSave = () => {
        const updatedUser = { name, email, phone, avatar };
        updateUser(updatedUser);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity style={styles.avatarContainer}>
                    <Image
                        source={avatar ? { uri: avatar } : require('../../../assets/icons/UserPlaceholder.png')}
                        style={styles.avatar}
                    />
                </TouchableOpacity>
                <TextInput
                    placeholder="Имя"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Телефон"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    style={styles.input}
                />
                <SaveButton onPress={handleSave} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        alignItems: 'center',
        padding: 20,
    },
    avatarContainer: {
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    input: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#207586',
        marginBottom: 15,
    },
});

export default UserInfoScreen;
