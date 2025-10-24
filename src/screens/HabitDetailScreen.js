import React, { useState } from 'react';
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
import WeeklyCalendar from '../components/WeeklyCalendar';
import HabitTaskItem from '../components/HabitTaskItem';
import FloatingActionButton from '../components/FloatingActionButton';
import AddTaskModal from '../components/AddTaskModal';
import ProgressRing from '../components/ProgressRing';

const HabitDetailScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { getHabitTasks, addTask } = useTasks();
  const { habit } = route.params;
  const [showAddModal, setShowAddModal] = useState(false);

  const habitTasks = getHabitTasks(habit.id);
  const todayTasks = habitTasks.filter(task => {
    const today = new Date().toDateString();
    const taskDate = new Date(task.createdAt).toDateString();
    return taskDate === today;
  });

  const completedTasks = habitTasks.filter(task => task.completed);
  const progressPercentage = habitTasks.length > 0 ? (completedTasks.length / habitTasks.length) * 100 : 0;

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
    headerTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
    },
    habitCard: {
      backgroundColor: theme.colors.card,
      marginHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.sm,
    },
    habitHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    habitIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: habit.color,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.lg,
    },
    habitInfo: {
      flex: 1,
    },
    habitTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    statsRow: {
      flexDirection: 'row',
      marginBottom: theme.spacing.md,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    statLabel: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
    },
    streakRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
    },
    streakIcon: {
      marginRight: theme.spacing.sm,
    },
    streakText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
    },
    streakValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginLeft: theme.spacing.xs,
    },
    section: {
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
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
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Back to habits</Text>
        </View>

        {/* Habit Details Card */}
        <View style={styles.habitCard}>
          <View style={styles.habitHeader}>
            <View style={styles.habitIcon}>
              <Ionicons name={habit.icon} size={40} color="white" />
            </View>
            <View style={styles.habitInfo}>
              <Text style={styles.habitTitle}>{habit.title}</Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{completedTasks.length}</Text>
                  <Text style={styles.statLabel}>Completed</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{habitTasks.length}</Text>
                  <Text style={styles.statLabel}>Your Goal</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.streakRow}>
            <Ionicons 
              name="trophy" 
              size={20} 
              color={theme.colors.primary} 
              style={styles.streakIcon}
            />
            <Text style={styles.streakText}>Longest Streak</Text>
            <Text style={styles.streakValue}>6 days</Text>
          </View>
        </View>

        {/* Weekly Calendar */}
        <WeeklyCalendar habitId={habit.id} />

        {/* Today's Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>
          {todayTasks.length > 0 ? (
            todayTasks.map((task) => (
              <HabitTaskItem key={task.id} task={task} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No tasks for today</Text>
            </View>
          )}
        </View>

        {/* All Tasks */}
        {habitTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>All Tasks</Text>
            {habitTasks.map((task) => (
              <HabitTaskItem key={task.id} task={task} />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton onPress={() => setShowAddModal(true)} />

      {/* Add Task Modal */}
      <AddTaskModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        habitId={habit.id}
      />
    </SafeAreaView>
  );
};

export default HabitDetailScreen;