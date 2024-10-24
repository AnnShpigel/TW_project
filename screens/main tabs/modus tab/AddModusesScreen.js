import React, { useState, useEffect, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, Image, Modal, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useModusContext } from './../../../ModusContext'
import NextButton from '../../../components/buttons/NextButton';
import BackButtonMainTab from '../../../components/buttons/BackButtonMainTab';

// Отображает экран добавления подмодусов в древовидную структуру
const AddModusesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentModus, setCurrentModus] = useState(null);
  const [childModusName, setChildModusName] = useState('');
  const [childModusDescription, setChildModusDescription] = useState('');
  const { moduses, addModus, buildModusTree } = useModusContext();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButtonMainTab />,
    });

    if (moduses.length > 0) {
      setCurrentModus(moduses[0]);
    }
  }, [moduses]);

  // Записывает модусы в контекст
  const handleAddModus = () => {
    const newModus = {
      id: Date.now().toString(),
      name: childModusName,
      description: childModusDescription,
      parentId: currentModus?.id || null
    };
    addModus(newModus);
    setChildModusName('');
    setChildModusDescription('');
    setModalVisible(false);
  };

  // Выстраивание структуры модусов в зависимости от уровня
  const renderModuses = (moduses, level = 0) => {
    return moduses.map((modus, index) => (
      <View key={modus.id} style={{ marginLeft: level? 40 : 0 }}>
        <View style={[styles.modusWrapper, { flexDirection: 'row', alignItems: 'center' }]}>
          <Image
            source={require('../../../assets/icons/Modus.png')}
            style={level === 0 ? styles.modusIcon : { width: 90 - level * 10, height: 90 - level * 10 }}
          />
          <View style={styles.modusNameContainer}>
            <Text style={styles.modusName}>{modus.name}</Text>
          </View>
          {level < 4 && (
            <TouchableOpacity
              onPress={() => { setCurrentModus(modus); setModalVisible(true); }}
              style={styles.addButton}
            >
              <Image source={require('../../../assets/icons/AddButton.png')} style={styles.addButtonIcon} />
            </TouchableOpacity>
          )}
        </View>
        {modus.children && renderModuses(modus.children, level + 1)}
      </View>
    ));
  };
  
  const modusTree = useMemo(() => buildModusTree(), [moduses]);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.description}>К своему модусу Вы можете добавить уровни</Text>

      <ScrollView style={styles.scrollView}>
      <View style={styles.modusWrapper}>
        {renderModuses(modusTree)}
      </View>
    </ScrollView>

    <View>
      <NextButton onPress={() => navigation.navigate('GoalsModusScreen')} />
    </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Добавление подмодуса</Text>
            <TextInput
              placeholder="Название модуса"
              value={childModusName}
              onChangeText={setChildModusName}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Описание модуса"
              value={childModusDescription}
              onChangeText={setChildModusDescription}
              style={styles.modalTextArea}
              multiline
            />
            <TouchableOpacity onPress={handleAddModus} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  description: {
    color: 'gray',
    textAlign: 'center',
    padding: 10,
    marginTop: 30
  },
  scrollView: {
    width: '100%',
  },
  modusWrapper: {
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    marginBottom: -5,
  },
  modusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modusIcon: {
    width: 110,
    height: 110,
  },
  modusNameContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    // paddingTop: '15%',
    paddingBottom: 7
  },
  modusName: {
    fontSize: 18,
  },
  addButton: {
    alignItems: 'center',
  },
  addButtonIcon: {
    width: 40,
    height: 40
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#207586',
    marginBottom: 15,
  },
  modalTextArea: {
    width: '100%',
    borderColor: '#207586',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 100,
    marginBottom: 20,
  },
  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: '#207586',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AddModusesScreen;