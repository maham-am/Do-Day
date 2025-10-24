import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';

const WeeklyCalendar = ({ habitId = null }) => {
  const { theme } = useTheme();
  const { tasks } = useTasks();

  const getCurrentWeek = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay + 1); // Start from Monday

    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const week = getCurrentWeek();
  const today = new Date();
  const todayDate = today.getDate();

  const isToday = (date) => {
    return date.getDate() === todayDate && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const isCompleted = (date) => {
    const dateString = date.toDateString();
    const dayTasks = tasks.filter(task => {
      const taskDate = new Date(task.createdAt).toDateString();
      return taskDate === dateString && (habitId ? task.habitId === habitId : true);
    });
    
    if (dayTasks.length === 0) return false;
    return dayTasks.every(task => task.completed);
  };

  const isPartial = (date) => {
    const dateString = date.toDateString();
    const dayTasks = tasks.filter(task => {
      const taskDate = new Date(task.createdAt).toDateString();
      return taskDate === dateString && (habitId ? task.habitId === habitId : true);
    });
    
    if (dayTasks.length === 0) return false;
    const completedCount = dayTasks.filter(task => task.completed).length;
    return completedCount > 0 && completedCount < dayTasks.length;
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      marginHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.sm,
    },
    dayNamesRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: theme.spacing.md,
    },
    dayName: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      textAlign: 'center',
      flex: 1,
    },
    datesRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    dateContainer: {
      alignItems: 'center',
      flex: 1,
    },
    dateText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    todayDateText: {
      color: theme.colors.primary,
    },
    statusIndicator: {
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    completedIndicator: {
      backgroundColor: theme.colors.primary,
    },
    partialIndicator: {
      backgroundColor: 'white',
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    emptyIndicator: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.dayNamesRow}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <Text key={day} style={styles.dayName}>
            {day}
          </Text>
        ))}
      </View>
      
      <View style={styles.datesRow}>
        {week.map((date, index) => (
          <TouchableOpacity key={index} style={styles.dateContainer}>
            <Text 
              style={[
                styles.dateText,
                isToday(date) && styles.todayDateText,
              ]}
            >
              {date.getDate()}
            </Text>
            <View 
              style={[
                styles.statusIndicator,
                isCompleted(date) && styles.completedIndicator,
                isPartial(date) && styles.partialIndicator,
                !isCompleted(date) && !isPartial(date) && styles.emptyIndicator,
              ]}
            >
              {isCompleted(date) && (
                <Ionicons name="checkmark" size={12} color="white" />
              )}
              {isPartial(date) && (
                <View 
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: theme.colors.primary,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default WeeklyCalendar;