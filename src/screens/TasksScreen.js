import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';
import FloatingActionButton from '../components/FloatingActionButton';

const TasksScreen = () => {
  const { theme } = useTheme();
  const { getTodayTasks, getCompletedTasks } = useTasks();
  const [showAddModal, setShowAddModal] = useState(false);

  const todayTasks = getTodayTasks();
  const completedTasks = getCompletedTasks();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.md,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuIcon: {
      marginRight: theme.spacing.md,
    },
    headerCenter: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dateText: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      marginRight: theme.spacing.xs,
    },
    headerRight: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    taskList: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: 100, // Space for FAB
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

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {/* Empty space where menu was */}
          </View>
          
          <View style={styles.headerCenter}>
            <Text style={styles.title}>My tasks</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{formattedDate}</Text>
              <Ionicons 
                name="chevron-down" 
                size={16} 
                color={theme.colors.textSecondary} 
              />
            </View>
          </View>
          
          <View style={styles.headerRight}>
            <Ionicons 
              name="leaf" 
              size={20} 
              color="white" 
            />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={styles.taskList}>
            {/* Today's Tasks */}
            {todayTasks.length > 0 ? (
              todayTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No tasks for today</Text>
              </View>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <>
                <View style={{ 
                  height: 1, 
                  backgroundColor: theme.colors.border, 
                  marginVertical: theme.spacing.md 
                }} />
                <Text style={{ 
                  fontSize: 16, 
                  color: theme.colors.textSecondary, 
                  marginBottom: theme.spacing.md 
                }}>
                  Day Done
                </Text>
                {completedTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Floating Action Button - Outside SafeAreaView */}
      <FloatingActionButton onPress={() => setShowAddModal(true)} />

      {/* Add Task Modal */}
      <AddTaskModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </View>
  );
};

export default TasksScreen;
