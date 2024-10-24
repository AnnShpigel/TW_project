import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useModusContext } from './../../../ModusContext';
import { useNavigation } from '@react-navigation/native';
import AddButton from '../../../components/buttons/AddButton';
import NotebookModusScreen from './NotebookModusScreen';

// Импорт изображений навигации для шапки
import MindMapIcon from './../../../assets/icons/MainTabModusMindMap.png'
import NotebookIcon from './../../../assets/icons/MainTabModusNotebook.png';
import ProcessIcon from './../../../assets/icons/MainTabModusProcess.png';

// Функция для создания кнопок в шапке
const HeaderButtons = ({ setScreenView }) => (
  <View style={styles.headerButtons}>
    <TouchableOpacity onPress={() => setScreenView('main')}>
      <Image source={MindMapIcon} style={styles.image} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setScreenView('notebook')}>
      <Image source={NotebookIcon} style={styles.image} />
    </TouchableOpacity>
    <TouchableOpacity>
      <Image source={ProcessIcon} style={styles.image} />
    </TouchableOpacity>
  </View>
);

// Функция для отображения активностей
const renderActivities = (activities) => {
  return activities.map((activity, index) => (
    <Text key={index}>Активность: {activity.name}</Text>
  ));
};

// Функция для отображения целей
const renderGoals = (goals) => {
  return goals.map((goal, index) => (
    <View key={index}>
      <Text>Цель: {goal.name}</Text>
      {renderActivities(goal.activities)}
    </View>
  ));
};

// Функция для отображения модусов (-> NotebookModus.Screen.js)
const renderModuses = (moduses) => {
  return <>
    <NotebookModusScreen/>
  </>
};

const ModusScreen = () => {
  const { moduses, buildModusTree } = useModusContext();
  const modusTree = useMemo(() => buildModusTree(), [moduses]);
  const navigation = useNavigation();

  const [screenView, setScreenView] = useState('main');

  const goToCreateModusScreen = () => {
      navigation.navigate('CreateModusScreen');
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButtons setScreenView={setScreenView} />,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {screenView === 'main' ? (
        <>
          <View style={styles.modusContainer}>
          </View>
          <AddButton onPress={goToCreateModusScreen} />
          </>
          ) : screenView === 'notebook' ? (
          <>
          <View style={styles.modusContainer}>
            {renderModuses(modusTree)}
          </View>
          </>
          ) : (
          <>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modusContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 5,
  },
});

export default ModusScreen;
