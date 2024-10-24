import React, { useState, useEffect, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, Image, Modal, StyleSheet, SafeAreaView } from 'react-native';
import { useModusContext } from './../../../ModusContext'

// Компонент для отображения структуры модусов в шапке
const NotebookModusScreen = () => {
    const [descriptionVisibility, setDescriptionVisibility] = useState({});
    const { moduses, buildModusTree } = useModusContext();
    const modusTree = useMemo(() => buildModusTree(), [moduses]);

    // Переключение видимости описания модуса по его идентификатору
    const toggleDescription = (id) => {
        setDescriptionVisibility(prevState => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    // Рендер активностей из контекста
    const renderActivities = (modusId, goalIndex) => {
        const modus = moduses.find(modus => modus.id === modusId);
        if (!modus) {
          return null;
        }
        const goal = modus.goals[goalIndex];
        if (!goal) {
          return null;
        }
        return goal.activities?.map((activity, index) => (
          <Activity
            key={index}
            activity={activity}
          />
        ));
    };

    // Текстовое название активности
    const Activity = ({ activity }) => (
        <View style={styles.activityContainer}>
          <Text style={styles.activityText}>
            Активность: {activity.name}
          </Text>
        </View>
      );

      //Рендер целей из контекста
    const renderGoals = (goals, modusId) => {
        return goals.map((goal, index) => (
          <View key={index} style={styles.goalContainer}>
            <Text style={styles.goalText}>
              Цель: {goal.name}
            </Text>
            {renderActivities(modusId, index)}
          </View>
        ));
      };

    const renderModuses = (moduses, level = 0) => {
        return moduses.map((modus, index) => (
            // Добавить нормальный стиль отображения модусов, в общем
            <View key={modus.id} style={{ marginLeft: level === 0 ? 10 : level === 1 ? 13 : level === 2 ? 6 : level === 3 ? 5 : 5 }}>
            <View style={[styles.modusWrapper, { flexDirection: 'row', alignItems: 'center' }]}>
                <Image
                source={require('../../../assets/icons/Modus.png')}
                style={level === 0 ? styles.modusIcon : { width: 90 - level * 10, height: 90 - level * 10 }}
                />
                <View style={styles.modusNameContainer}>
                <Text style={styles.modusName}>{modus.name}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => toggleDescription(modus.id)}
                    style={styles.iconButton}
                >
                    <Image source={descriptionVisibility[modus.id] ? require('../../../assets/icons/TextModusUp.png') : require('../../../assets/icons/TextModusDown.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
            {descriptionVisibility[modus.id] && (
  <View style={styles.descriptionContainer}>
    <Text>
      {modus.description.split('\n').map((line, index) => (
        <Text key={index}>
          {line}
          {"\n"}
        </Text>
      ))}
    </Text>
    {modus.goals && renderGoals(modus.goals, modus.id)}
  </View>
)}
            {modus.children && renderModuses(modus.children, level + 1)}
            </View>
        ));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView>
            <View style={styles.modusWrapper}>
                {renderModuses(modusTree)}
            </View>
            </ScrollView>
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
  descriptionContainer: {
      padding: 20,
      marginVertical: 10,
  },
  iconButton: {
      marginLeft: 10,
  },
  goalContainer: {
      marginTop: 5,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'column'
  },
  goalText: {
      fontSize: 18,
      color: 'gray',
      marginBottom: 10,
    },
  
    activityText: {
      fontSize: 16,
      color: 'gray',
      marginBottom: 10,
    },
});

export default NotebookModusScreen;
