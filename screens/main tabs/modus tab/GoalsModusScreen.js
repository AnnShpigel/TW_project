import React, { useState, useEffect, useMemo } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useModusContext } from './../../../ModusContext';
import BackButtonMainTab from '../../../components/buttons/BackButtonMainTab';
import NextButton from '../../../components/buttons/NextButton';
import GoalsAndActivitiesInputs from '../../../components/inputs/GoalsAndActivitesInputs';

// Компонент для добавления целей под каждый модус
const GoalsModusScreen = () => {
  const { moduses, buildModusTree, updateGoalsForModus } = useModusContext();
  const modusTree = useMemo(() => buildModusTree(), [moduses]);
  const navigation = useNavigation();
  const [goals, setGoals] = useState({});

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButtonMainTab />,
    });
  }, [navigation]);

  // Обновление названия цели
  const handleChangeGoal = (modusId, index, text) => {
    const updatedGoals = {...goals};
    if (!updatedGoals[modusId]) {
      updatedGoals[modusId] = [];
    }
    updatedGoals[modusId][index] = text;
    setGoals(updatedGoals);
  };

  // Добавление новой цели
  const handleAddGoal = (modusId) => {
    const updatedGoals = {...goals};
    if (!updatedGoals[modusId]) {
      updatedGoals[modusId] = [{ name: '', activities: [] }];
    } else {
      updatedGoals[modusId].push({ name: '', activities: [] });
    }
    setGoals(updatedGoals);
  };

  // Сохранение целей в контекст
  const handleSaveGoals = () => {
    Object.keys(goals).forEach(modusId => {
      if (goals[modusId].length > 0) {  
        updateGoalsForModus(modusId, goals[modusId]);
      }
    });
    navigation.navigate('ActivitiesModusScreen'); 
  };

  // Отображение полей ввода для каждой цели модуса
  // Связана с отступами модусов, отступ слева в зависимости от уменьшения иконки модуса
  const renderGoalsInputs = (modusId) => {
    return goals[modusId]?.map((goal, index) => (
      <GoalsAndActivitiesInputs
        key={index}
        placeholder="Введите цель"
        value={goal.name}
        onChangeText={(text) => handleChangeGoal(modusId, index, text)}
      />
    ));
  };

  // Рекурсивное отображение модусов и целей
  const renderModuses = (moduses, level = 0) => {
    return moduses.map((modus) => (
      <View key={modus.id} style={{ marginLeft: level === 0 ? 10 : level === 1 ? 13 : level === 2 ? 6 : level === 3 ? 5 : 5 }}>
        <View style={[styles.modusWrapper, { flexDirection: 'row', alignItems: 'center' }]}>
          <Image
            source={require('../../../assets/icons/Modus.png')}
            style={level === 0 ? styles.modusIcon : { width: 90 - level * 10, height: 90 - level * 10 }}
          />
          <Text style={styles.modusName}>{modus.name}</Text>
        </View>
        {renderGoalsInputs(modus.id)}
        <TouchableOpacity onPress={() => handleAddGoal(modus.id)} style={styles.addButton}>
          <Image
            source={require('../../../assets/icons/AddButton.png')}
            style={styles.addButtonIcon}
          />
        </TouchableOpacity>
        {modus.children && renderModuses(modus.children, level + 1)}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.description}>Опишите конкретные результаты, к которым планируете прийти</Text>
      <ScrollView style={styles.scrollView}>
        {renderModuses(modusTree)}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <NextButton onPress={handleSaveGoals} />
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modusIcon: {
    width: 110,
    height: 110,
    marginRight: 10,
  },
  modusNameContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingBottom: 7,
  },
  modusName: {
    fontSize: 18,
  },
  buttonContainer: {
    padding: 20,
    width: '100%',
  },
  addButtonIcon: {
    width: 40,
    height: 40,
  },
  addButton: {
    alignItems: 'center'
  }
});

export default GoalsModusScreen;