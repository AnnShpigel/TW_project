import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useModusContext } from './../../../ModusContext';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const { moduses } = useModusContext();
  const [currentWeek, setCurrentWeek] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [gestureX, setGestureX] = useState(new Animated.Value(0));
  const [eventsByDay, setEventsByDay] = useState({});

  useEffect(() => {
    setCurrentWeek(getInitialWeek());
    setEventsByDay(prevEventsByDay => getEventsByDayFromModuses(moduses));
  }, [moduses]);

  // Формирует объект, содержащий события для каждой недели на основе данных пользователя
  const getEventsByDayFromModuses = (moduses) => {
    const eventsByDay = {
      0: [], // воскресенье
      1: [], // понедельник
      2: [], // вторник
      3: [], // среда
      4: [], // четверг
      5: [], // пятница
      6: [], // суббота
    };
  
    const dayNameToIndex = {
      'вс': 0,
      'пн': 1,
      'вт': 2,
      'ср': 3,
      'чт': 4,
      'пт': 5,
      'сб': 6,
    };
  
    moduses.forEach(modus => {
      modus.goals.forEach(goal => {
        goal.activities.forEach(activity => {
          Object.keys(activity.days).forEach(dayName => {
            if (activity.days[dayName]) {
              const dayIndex = dayNameToIndex[dayName];
              const start = new Date();
              start.setHours(activity.startTime.hours);
              start.setMinutes(activity.startTime.minutes);
              start.setSeconds(0);
              start.setMilliseconds(0);
  
              const end = new Date(start.getTime());
              end.setHours(activity.endTime.hours);
              end.setMinutes(activity.endTime.minutes);
              end.setSeconds(0);
              end.setMilliseconds(0);
  
              const event = {
                title: activity.name,
                start: start,
                end: end,
              };
  
              eventsByDay[dayIndex].push(event);
            }
          });
        });
      });
    });
  
    return eventsByDay;
  };  

  // Получаеет и возвращает массив с данными текущей недели
  const getInitialWeek = () => {
    const today = new Date();
    let startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - ((today.getDay() + 6) % 7));
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6);
  
    const week = [];
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      week.push(new Date(date));
    }

    return week;
  };

  // handleGesture и handleGestureEnd обрабатывают жесты пользователя для пролистывания
  // календаря и обновляет текущую неделю с соответствии с текущей неделей 
  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX: gestureX } }],
    { useNativeDriver: true },
  );

  const handleGestureEnd = (event) => {
    const { translationX } = event.nativeEvent;
    if (translationX > width / 3) {
      setCurrentWeek(getNextWeek(currentWeek));
    } else if (translationX < -width / 3) {
      setCurrentWeek(getPrevWeek(currentWeek));
    }
    Animated.timing(gestureX, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Принимает текущую неделю и возвращает следующую неделю
  const getPrevWeek = (week) => {
    const lastDay = week[week.length - 1];
    const nextWeek = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + i + 1);
      nextWeek.push(date);
    }
    return nextWeek;
  };

  // Принимает текущую неделю и возвращает предыдущую неделю
  const getNextWeek = (week) => {
    const firstDay = week[0];
    const prevWeek = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() - (7 - i));
      prevWeek.push(date);
    }
    return prevWeek;
  };

  // Обновляет выбранный день в календаре при выборе пользователя
  const handleDayPress = (day) => {
    setSelectedDay(day);
  };

  // Отображает дни недели в календаре
  const renderDaysOfWeek = () => (
    <PanGestureHandler
      onGestureEvent={handleGesture}
      onHandlerStateChange={handleGestureEnd}
    >
      <Animated.View style={[styles.daysOfWeekContainer, { transform: [{ translateX: gestureX }] }]}>
        {currentWeek.map((day, index) => (
          <TouchableOpacity key={index} onPress={() => handleDayPress(day)}>
            <View style={[styles.dayContainer, isSelectedDay(day) && styles.selectedDayContainer]}>
              <Text style={[styles.dayText, isSelectedDay(day) && styles.selectedDayText]}>{day.getDate()}</Text>
              <View style={[styles.dayNameContainer, isSelectedDay(day) && styles.selectedDayNameContainer]}>
                <Text style={[styles.dayNameText, isSelectedDay(day) && styles.selectedDayNameText]}>
                  {getDayName(day.getDay())}
                </Text>
                {isSelectedDay(day) ? <View style={styles.selectedDayIndicator} /> : null}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </PanGestureHandler>
  );

  // Проверяет, выбран ли конкретный день в календаре
  const isSelectedDay = (day) => {
    return day.getDate() === selectedDay.getDate() &&
           day.getMonth() === selectedDay.getMonth() &&
           day.getFullYear() === selectedDay.getFullYear();
  };

  const getDayName = (dayIndex) => {
    const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return daysOfWeek[dayIndex];
  };

  //Получает название дня недели по его индексу
  const renderEvents = (selectedDay) => {
    const dayEvents = eventsByDay[selectedDay.getDay()] ?? [];
    const eventTimes = [...new Set(dayEvents.flatMap((event) => [event.start, event.end]))];
    eventTimes.sort((a, b) => a.getTime() - b.getTime());
  
    const minTime = Math.min(...eventTimes.map((time) => time.getTime()));
    const maxTime = Math.max(...eventTimes.map((time) => time.getTime()));

    return (
      <ScrollView>
        <View style={styles.eventContainer}>
          <View style={styles.eventTimesContainer}>
            {eventTimes.map((time, index) => {
              const nextTime = eventTimes[index + 1] || new Date(maxTime + 3600000);
              const height = getTimeHeight(time, nextTime);
              return (
                <View key={index} style={{ height }}>
                  <Text style={styles.eventTimeText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.eventsContainer}>
            <View style={{ height: getTimeHeight(new Date(minTime), new Date(maxTime + 3600000)) }}>
              {eventTimes.map((time, index) => (
                <View key={index} style={{ position: 'absolute', left: 0, right: 0, top: 10 }}>
                  {dayEvents.map((event, eventIndex) => {
                    const eventStart = event.start.getTime();
                    const eventEnd = event.end.getTime();
                    const isEventStartInRange = eventStart >= time.getTime() && eventStart < (eventTimes[index + 1]?.getTime() || maxTime + 3600000);
                    const isEventEndInRange = eventEnd > time.getTime() && eventEnd <= (eventTimes[index + 1]?.getTime() || maxTime + 3600000);
    
                    if (isEventStartInRange || isEventEndInRange) {
                      const eventHeight = getTimeHeight(event.start, event.end);
                      const eventTop = eventEnd < eventStart ? getTimeHeight(new Date(minTime), new Date(eventEnd)) : getTimeHeight(new Date(minTime), event.start);
    
                      return (
                        <View
                          key={eventIndex}
                          style={[
                            styles.eventBlock,
                            {
                              height: eventHeight,
                              width: '100%',
                              top: eventTop,
                            },
                          ]}
                        >
                          <Text style={styles.eventText}>{event.title}</Text>
                        </View>
                      );
                    }
    
                    return null;
                  })}
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  
  // Вычисляет высоту блока события на основе временного интервала
  const getTimeHeight = (start, end) => {
    const diffMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    return diffMinutes;
  };

  return (
    <View style={styles.container}>
      {renderDaysOfWeek()}
      {(eventsByDay[selectedDay.getDay()] ?? []).length ? renderEvents(selectedDay) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  dayContainer: {
    alignItems: 'center',
    width: 40,
  },
  dayText: {
    fontSize: 24,
  },
  dayNameText: {
    fontSize: 12,
  },
  selectedDayNameText: {
    color: '#2D6D76',
  },
  selectedDayContainer: {
    borderBottomWidth: 2, 
    borderColor: '#2D6D76',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDayText: {
    color: '#2D6D76',
  },
  hourContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  hourText: {
    width: 50,
    fontSize: 12,
    color: '#888',
  },
  eventContainer: {
    position: 'absolute',
    height: '100%',
    backgroundColor: 'lightblue',
    borderRadius: 8,
    padding: 8,
  },
  eventText: {
    fontSize: 12,
  },
  eventTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  eventTimeText: {
    width: 60,
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  eventContainer: {
    flexDirection: 'row',
  },
  eventTimesContainer: {
    marginRight: 16,
  },
  eventTimeText: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginVertical: 8,
  },
  eventsContainer: {
    flex: 1,
  },
  eventsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  eventBlock: {
    backgroundColor: 'lightblue',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  eventText: {
    fontSize: 12,
  },
  
});

export default ProfileScreen;
