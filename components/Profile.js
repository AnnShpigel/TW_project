// Импортируем необходимые модули
// useContext позволяет получить текущее значение контекста
// useState позволяет создать и управлять состоянием компонента
import React, { useContext, useState } from 'react';
// Импортируем необходимые компоненты из react-native
import { View, Text, Image, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// Импортируем иконки из @expo/vector-icons
import { FontAwesome, Entypo } from '@expo/vector-icons';
// Импортируем модуль для выбора изображений
import * as ImagePicker from 'expo-image-picker';
// Импортируем контекст данных
import { DataContext } from './DataProvider';

// Компонент профиля
const Profile = () => {
    // Получаем текущее значение контекста данных и функцию для его обновления
    const [data, setData] = useContext(DataContext);
    // Создаем состояние для имени и email пользователя
    const [name, setName] = useState(data.profile?.name || '');
    const [email, setEmail] = useState(data.profile?.email || '');
    // Создаем временное состояние для редактирования имени и email
    const [tempName, setTempName] = useState(name);
    const [tempEmail, setTempEmail] = useState(email);
    // Создаем состояние для изображения профиля
    const [image, setImage] = useState(null);
    // Создаем состояние для отображения модального окна
    const [modalVisible, setModalVisible] = useState(false);
    // Создаем состояние для проверки валидности email
    const [validEmail, setValidEmail] = useState(true);

    // Функция для проверки валидности email
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    // Функция для открытия модального окна редактирования профиля
    const handleEditProfile = () => {
        setTempName(name);
        setTempEmail(email);
        setModalVisible(true);
    };

    // Функция для сохранения изменений профиля
    const handleSaveProfile = () => {
        if (validateEmail(tempEmail)) {
        setName(tempName);
        setEmail(tempEmail);
        setData(prev => ({ ...prev, profile: { name: tempName, email: tempEmail } }));
        setModalVisible(false);
        setValidEmail(true);
        } else {
        setValidEmail(false);
        }
    };

    // Функция для выбора изображения профиля
    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        });

        if (!result.cancelled) {
        setImage(result.uri);
        }
    };

    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={handleChoosePhoto} style={styles.avatar}>
            {image ? (
            <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            ) : (
            <FontAwesome name="user-circle-o" size={100} color="black" />
            )}
        </TouchableOpacity>
        <View style={styles.info}>
            <Text style={styles.text}>{name || 'Имя'}</Text>
            <Text style={styles.text}>{email || 'Email'}</Text>
        </View>
        <TouchableOpacity onPress={handleEditProfile} style={styles.edit}>
            <Entypo name="pencil" size={24} color="black" />
        </TouchableOpacity>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Редактирование профиля</Text>

                <TextInput
                style={styles.input}
                onChangeText={setTempName}
                value={tempName}
                placeholder="Имя"
                />

                <TextInput
                style={[styles.input, !validEmail ? styles.error : null]}
                onChangeText={setTempEmail}
                value={tempEmail}
                placeholder="Email"
                />
                {!validEmail && <Text style={styles.errorText}>Нужно изменить email</Text>}

                <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: "#408F9E" }}
                    onPress={handleSaveProfile}
                >
                    <Text style={styles.textStyle}>Сохранить</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: "#408F9E" }}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textStyle}>Отмена</Text>
                </TouchableOpacity>
                </View>
            </View>
            </View>
        </Modal>
        </View>
    );
};

// Определение стилей компонента
const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 40, width: '90%' },
  avatar: { marginRight: 20, marginLeft: 20 },
  info: { flex: 1, marginRight: 20 },
  text: { borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 10 },
  edit: { marginLeft: 20 },
  centeredView: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22 },
  modalView: { margin: 20, backgroundColor: "white", borderRadius: 20, padding: 35, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  button: { borderRadius: 20, padding: 10, elevation: 2, margin: 10 },
  buttonContainer: { flexDirection: 'row' },
  textStyle: { color: "white", fontWeight: "bold", textAlign: "center" },
  modalText: { marginBottom: 15, textAlign: "center" },
  input: { height: 40, width: 200, margin: 12, borderWidth: 1, padding: 10 },
  error: { borderColor: 'red' },
  errorText: { color: 'red' },
});

export default Profile;