import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import ProgressIndicator from './ProgressIndicator';

const HabitCard = ({ habit, onPress }) => {
  const { theme } = useTheme();
  const { getHabitTasks } = useTasks();

  const getHabitIcon = (title) => {
    const iconMap = {
      'Meditation': 'leaf',
      'Drink water': 'water',
      'Sleep 8 hours daily': 'moon',
      'Gym workouts': 'fitness',
    };
    return iconMap[title] || 'checkmark-circle';
  };

  const getHabitIconColor = (title) => {
    const colorMap = {
      'Meditation': '#06B6D4',
      'Drink water': '#3B82F6',
      'Sleep 8 hours daily': '#1E40AF',
      'Gym workouts': '#3B82F6',
    };
    return colorMap[title] || theme.colors.primary;
  };

  const habitTasks = getHabitTasks(habit.id);
  const completedTasks = habitTasks.filter(task => task.completed);
  const progressPercentage = habitTasks.length > 0 ? (completedTasks.length / habitTasks.length) * 100 : 0;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      ...theme.shadows.sm,
    },
    iconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: getHabitIconColor(habit.title),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.md,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    progressText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    progressContainer: {
      alignItems: 'center',
      marginLeft: theme.spacing.md,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={getHabitIcon(habit.title)} 
          size={28} 
          color="white" 
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{habit.title}</Text>
        <Text style={styles.progressText}>
          {completedTasks.length}/{habitTasks.length}
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <ProgressIndicator 
          progress={progressPercentage}
          size={40}
        />
      </View>
    </TouchableOpacity>
  );
};

export default HabitCard;