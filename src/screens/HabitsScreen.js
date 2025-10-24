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
import HabitCard from '../components/HabitCard';
import FloatingActionButton from '../components/FloatingActionButton';
import AddHabitModal from '../components/AddHabitModal';

const HabitsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { habits, getTodayHabits, getCompletedToday } = useTasks();
  const [showAddModal, setShowAddModal] = useState(false);

  const todayHabits = getTodayHabits();
  const completedToday = getCompletedToday();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.md,
    },
    dateText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    searchIcon: {
      position: 'absolute',
      right: theme.spacing.md,
      top: theme.spacing.lg,
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
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
          <TouchableOpacity style={styles.searchIcon}>
            <Ionicons 
              name="search-outline" 
              size={24} 
              color={theme.colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>

        {/* Weekly Calendar */}
        <WeeklyCalendar />

        {/* Today's Habits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>
          {todayHabits.length > 0 ? (
            todayHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onPress={() => navigation.navigate('HabitDetail', { habit })}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No habits for today</Text>
            </View>
          )}
        </View>

        {/* Completed Today */}
        {completedToday.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Completed today</Text>
            {            completedToday.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onPress={() => navigation.navigate('HabitDetail', { habit })}
              />
            ))}
          </View>
        )}

      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton onPress={() => setShowAddModal(true)} />

      {/* Add Habit Modal */}
      <AddHabitModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </SafeAreaView>
  );
};

export default HabitsScreen;