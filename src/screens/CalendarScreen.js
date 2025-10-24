import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';

const CalendarScreen = () => {
  const { theme } = useTheme();
  const { getTodayTasks, getTasksByDate } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update current date every minute for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const todayTasks = getTodayTasks();
  const selectedDateTasks = getTasksByDate ? getTasksByDate(selectedDate) : [];

  // Month navigation functions
  const goToPreviousMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const days = getDaysInMonth(selectedDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.md,
    },
    backButton: {
      marginRight: theme.spacing.md,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      flex: 1,
      textAlign: 'center',
    },
    calendarContainer: {
      backgroundColor: theme.colors.lightGreen,
      marginHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.sm,
    },
    monthHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    monthText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    dayNamesRow: {
      flexDirection: 'row',
      marginBottom: theme.spacing.sm,
    },
    dayName: {
      flex: 1,
      textAlign: 'center',
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.textSecondary,
    },
    daysGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dayCell: {
      width: '14.28%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    dayText: {
      fontSize: 16,
      color: theme.colors.primary,
    },
    selectedDay: {
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
    },
    selectedDayText: {
      color: 'white',
      fontWeight: 'bold',
    },
    todayText: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    tasksSection: {
      paddingHorizontal: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    taskItem: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      ...theme.shadows.sm,
    },
    taskFlag: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: theme.colors.flagRed,
      marginRight: theme.spacing.sm,
    },
    taskInfo: {
      flex: 1,
    },
    taskTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 2,
    },
    taskCompletion: {
      fontSize: 14,
      color: theme.colors.text,
    },
    taskEditIcon: {
      marginLeft: theme.spacing.sm,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.xl,
    },
    emptyText: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    dayContent: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    taskDot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.primary,
      marginTop: 2,
    },
    selectedTaskDot: {
      backgroundColor: 'white',
    },
  });

  const isToday = (date) => {
    const today = new Date();
    return date && 
           date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date) => {
    return date && 
           date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  const hasTasks = (date) => {
    if (!date) return false;
    const tasksForDate = getTasksByDate(date);
    return tasksForDate.length > 0;
  };

  const getFlagColor = (category) => {
    const colors = {
      'Personal': '#10B981', // Green
      'Work': '#EF4444', // Red
      'Education': '#F59E0B', // Orange
      'Sport': '#84CC16', // Light green
      'Health': '#EF4444', // Red
    };
    return colors[category] || '#6B7280';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>
            {currentDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric'
            })}
          </Text>
        </View>

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <View style={styles.monthHeader}>
            <TouchableOpacity onPress={goToPreviousMonth}>
              <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToToday}>
              <Text style={styles.monthText}>
                {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToNextMonth}>
              <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.dayNamesRow}>
            {dayNames.map((day) => (
              <Text key={day} style={styles.dayName}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {days.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayCell,
                  isSelected(day) && styles.selectedDay,
                ]}
                onPress={() => day && setSelectedDate(day)}
              >
                {day && (
                  <View style={styles.dayContent}>
                    <Text
                      style={[
                        styles.dayText,
                        isSelected(day) && styles.selectedDayText,
                        isToday(day) && !isSelected(day) && styles.todayText,
                      ]}
                    >
                      {day.getDate()}
                    </Text>
                    {hasTasks(day) && (
                      <View style={[styles.taskDot, isSelected(day) && styles.selectedTaskDot]} />
                    )}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Selected Date Tasks */}
        <View style={styles.tasksSection}>
          <Text style={styles.sectionTitle}>
            {isToday(selectedDate) ? "Today's Tasks" : 
             selectedDate.toLocaleDateString('en-US', { 
               weekday: 'long', 
               month: 'short', 
               day: 'numeric' 
             }) + " Tasks"}
          </Text>
          {(isToday(selectedDate) ? todayTasks : selectedDateTasks).length > 0 ? (
            (isToday(selectedDate) ? todayTasks : selectedDateTasks).map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <View style={[styles.taskFlag, { backgroundColor: getFlagColor(task.category) }]} />
                <View style={styles.taskInfo}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskCompletion}>
                    completed: {task.completed ? '3/3' : '2/4'}
                  </Text>
                </View>
                <TouchableOpacity style={styles.taskEditIcon}>
                  <Ionicons 
                    name="create-outline" 
                    size={20} 
                    color={theme.colors.primary} 
                  />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                {isToday(selectedDate) ? "No tasks for today" : "No tasks for this date"}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;