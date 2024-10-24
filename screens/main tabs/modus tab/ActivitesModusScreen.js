import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useModusContext } from './../../../ModusContext';
import BackButtonMainTab from '../../../components/buttons/BackButtonMainTab';
import NextButton from '../../../components/buttons/NextButton';
import { Picker } from '@react-native-picker/picker';

// Добавление активностей к каждой цели
const ActivitiesModusScreen = () => {
  const { moduses, buildModusTree, addActivityToGoal } = useModusContext();
  const modusTree = useMemo(() => buildModusTree(), [moduses]);
  const navigation = useNavigation();
  

  const [addedModusId, setAddedModusId] = useState(null);
  const [addedGoalIndex, setAddedGoalIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activityName, setActivityName] = useState("");
  const [selectedDays, setSelectedDays] = useState({
    'пн': false,
    'вт': false,
    'ср': false,
    'чт': false,
    'пт': false,
    'сб': false,
    'вс': false,
  });

  const [startTime, setStartTime] = useState({ hours: '00', minutes: '00' });
  const [endTime, setEndTime] = useState({ hours: '00', minutes: '00' });
  const [activityDifficulty, setActivityDifficulty] = useState('1');

  // Компонент для отображения и управления состоянием чекбоксов выбора дней
  const CheckBox = ({ label, selected, onSelect }) => {
    return (
      <TouchableOpacity style={styles.checkboxContainer} onPress={onSelect}>
        <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
          <Text style={styles.checkboxLabel}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    console.log("Modus data:", moduses);
    navigation.setOptions({
      headerLeft: () => <BackButtonMainTab />,
    });
  }, [moduses, navigation]);

  const [activities, setActivities] = useState({});

  const handleAddActivity = (modusId, goalIndex) => {
    // Открываем модальное окно и сохраняем modusId и goalIndex
    setModalVisible(true);
    setAddedModusId(modusId);
    setAddedGoalIndex(goalIndex);
  };
  
  // Сохранение активности и ее данных в контекст
  const handleSaveActivity = () => {
    const activity = {
      name: activityName,
      days: selectedDays,
      startTime,
      endTime,
      difficulty: activityDifficulty,
    };
    addActivityToGoal(addedModusId, addedGoalIndex, activity);
    setModalVisible(false);
  };

  const renderActivities = (modusId, goalIndex) => {
    const modus = moduses.find(modus => modus.id === modusId);
    if (!modus) {
      console.log(`Модус с ID ${modusId} не найден`);
      return null;
    }
    const goal = modus.goals[goalIndex];
    if (!goal) {
      console.log(`Цель с индексом ${goalIndex} не найдена для модуса с ID ${modusId}`);
      return null;
    }
    return goal.activities?.map((activity, index) => (
      <Activity
        key={index}
        activity={activity}
      />
    ));
  };

  const Activity = ({ activity }) => (
    <View style={styles.activityContainer}>
      <Text style={styles.activityText}>
        Активность: {activity.name}
      </Text>
    </View>
  );

  const renderGoals = (goals, modusId) => {
    return goals.map((goal, index) => (
      <View key={index} style={styles.goalContainer}>
        <Text style={styles.goalText}>
          Цель: {goal.name}
        </Text>
        <TouchableOpacity onPress={() => handleAddActivity(modusId, index)} style={styles.addButton}>
          <Image
            source={require('../../../assets/icons/AddButton.png')}
            style={styles.addButtonIcon}
          />
        </TouchableOpacity>
        {renderActivities(modusId, index)}
      </View>
    ));
  };
  
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
          {modus.goals && modus.goals.length > 0 && renderGoals(modus.goals, modus.id)}
          {modus.children && renderModuses(modus.children, level + 1)}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.description}>Теперь к каждой цели мы можете установить необходимые шаги для достижения</Text>
      <ScrollView style={styles.scrollView}>
        {renderModuses(modusTree)}
      </ScrollView>
      <View>
        <NextButton onPress={() => navigation.navigate('ModusScreen')} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Добавление активности</Text>
            <TextInput
              placeholder="Название активности"
              value={activityName}
              onChangeText={setActivityName}
              style={styles.modalInput}
            />
            <View style={styles.checkboxGroup}>
              {Object.keys(selectedDays).map((day) => (
                <CheckBox
                  key={day}
                  label={day}
                  selected={selectedDays[day]}
                  onSelect={() => setSelectedDays({ ...selectedDays, [day]: !selectedDays[day] })}
                />
              ))}
            </View>
            <Text style={styles.timeLabel}>Начало активности</Text>
            <View style={styles.timeContainer}>
              <Picker
                selectedValue={startTime.hours}
                style={styles.timePicker}
                onValueChange={(itemValue) => setStartTime({ ...startTime, hours: itemValue })}
              >
                {Array.from({ length: 24 }, (_, i) => i).map((_, i) => (
                  <Picker.Item key={i} label={i < 10 ? `0${i}` : `${i}`} value={i < 10 ? `0${i}` : `${i}`} />
                ))}
              </Picker>
              <Picker
                selectedValue={startTime.minutes}
                style={styles.timePicker}
                onValueChange={(itemValue) => setStartTime({ ...startTime, minutes: itemValue })}
              >
                {Array.from({ length: 12 }, (_, i) => i * 5).map((value, i) => (
                  <Picker.Item key={i} label={value < 10 ? `0${value}` : `${value}`} value={value < 10 ? `0${value}` : `${value}`} />
                ))}
              </Picker>
            </View>
            <Text style={styles.timeLabel}>Конец активности</Text>
            <View style={styles.timeContainer}>
              <Picker
                selectedValue={endTime.hours}
                style={styles.timePicker}
                onValueChange={(itemValue) => setEndTime({ ...endTime, hours: itemValue })}
              >
                {Array.from({ length: 24 }, (_, i) => i).map((_, i) => (
                  <Picker.Item key={i} label={i < 10 ? `0${i}` : `${i}`} value={i < 10 ? `0${i}` : `${i}`} />
                ))}
              </Picker>
              <Picker
                selectedValue={endTime.minutes}
                style={styles.timePicker}
                onValueChange={(itemValue) => setEndTime({ ...endTime, minutes: itemValue })}
              >
                {Array.from({ length: 12 }, (_, i) => i * 5).map((value, i) => (
                  <Picker.Item key={i} label={value < 10 ? `0${value}` : `${value}`} value={value < 10 ? `0${value}` : `${value}`} />
                ))}
              </Picker>
            </View>
            <Text style={styles.difficultyLabel}>Оцените сложность активности от 1 до 5</Text>
            <Picker
              selectedValue={activityDifficulty}
              style={styles.difficultyPicker}
              onValueChange={(itemValue) => setActivityDifficulty(itemValue)}
            >
              {Array.from({ length: 5 }, (_, i) => i + 1).map((value, i) => (
                <Picker.Item key={i} label={`${value}`} value={`${value}`} />
              ))}
            </Picker>
            <TouchableOpacity onPress={handleSaveActivity} style={styles.saveButton}>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modusIcon: {
    width: 110,
    height: 110,
    marginRight: 10,
  },
  modusName: {
    fontSize: 18,
  },
  goalContainer: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  goalText: {
    fontSize: 18,
    color: 'gray',
    marginLeft: 10,
  },
  buttonContainer: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    alignItems: 'center',
    marginTop: 5
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
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: '#207586',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, 
    backgroundColor: '#ededed',
  },
  checkboxSelected: {
    backgroundColor: '#207586',
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#000',
  },
  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: '#207586',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  timeLabel: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    color: 'gray',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
    borderColor: '#207586',
    borderWidth: 1,
    borderRadius: 5,
  },
  timePicker: {
    flex: 1,
  },
  activityContainer: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  activityText: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 10,
    marginBottom: -10,
    marginTop: -5,
  },
  difficultyLabel: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    color: 'gray'
  },
  difficultyPicker: {
    width: '40%',
    marginBottom: 10,
    borderColor: '#207586',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default ActivitiesModusScreen;
