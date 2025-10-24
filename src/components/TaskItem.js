import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { theme } = useTheme();
  const { toggleTask, deleteTask, updateTask, updateSubtasks, toggleSubtask } = useTasks();
  const scale = useRef(new Animated.Value(1)).current;
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSubtaskEditModal, setShowSubtaskEditModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editTime, setEditTime] = useState(task.time || '');
  const [editSubtasks, setEditSubtasks] = useState(task.subtasks || []);

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

  const handleToggle = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    toggleTask(task.id);
  };

  const handleSubtaskToggle = (subtaskId) => {
    toggleSubtask(task.id, subtaskId);
  };

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEditSubtasks = () => {
    setShowMenu(false);
    setShowSubtaskEditModal(true);
  };

  const handleSaveSubtasks = () => {
    updateSubtasks(task.id, editSubtasks);
    setShowSubtaskEditModal(false);
  };

  const handleCancelSubtaskEdit = () => {
    setEditSubtasks(task.subtasks || []);
    setShowSubtaskEditModal(false);
  };

  const addSubtask = () => {
    const newSubtask = {
      id: Date.now(),
      text: '',
      completed: false
    };
    setEditSubtasks([...editSubtasks, newSubtask]);
  };

  const removeSubtask = (subtaskId) => {
    setEditSubtasks(editSubtasks.filter(st => st.id !== subtaskId));
  };

  const updateSubtaskText = (subtaskId, text) => {
    setEditSubtasks(editSubtasks.map(st => 
      st.id === subtaskId ? { ...st, text } : st
    ));
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setShowMenu(false);
  };

  const handleEdit = () => {
    setShowMenu(false);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      Alert.alert('Error', 'Task title cannot be empty');
      return;
    }

    updateTask(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      time: editTime.trim(),
      subtasks: editSubtasks.filter(st => st.text.trim() !== ''),
    });
    
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditTime(task.time || '');
    setEditSubtasks(task.subtasks || []);
    setShowEditModal(false);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      marginBottom: theme.spacing.md,
      padding: theme.spacing.md,
      ...theme.shadows.sm,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: theme.spacing.sm,
    },
    flagIcon: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: getFlagColor(task.category),
      marginRight: theme.spacing.sm,
    },
    taskTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      flex: 1,
    },
    starIcon: {
      marginLeft: theme.spacing.sm,
    },
    rightIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    editIcon: {
      marginRight: theme.spacing.sm,
    },
    chevronIcon: {
      marginLeft: theme.spacing.sm,
    },
    completionStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    completionText: {
      fontSize: 14,
      color: theme.colors.text,
      marginRight: theme.spacing.xs,
    },
    completionCount: {
      fontSize: 14,
      color: theme.colors.warning,
      fontWeight: '600',
    },
    subtasks: {
      marginTop: theme.spacing.sm,
    },
    subtask: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    subtaskBullet: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.textSecondary,
      marginRight: theme.spacing.sm,
    },
    subtaskText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      flex: 1,
    },
    subtaskCheckbox: {
      width: 16,
      height: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkbox: {
      width: 18,
      height: 18,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.sm,
    },
    menuModal: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuContainer: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      minWidth: 150,
      ...theme.shadows.lg,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.sm,
    },
    menuItemText: {
      fontSize: 16,
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
    },
    deleteText: {
      color: theme.colors.error,
    },
    editModal: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    editContainer: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      width: '90%',
      maxWidth: 400,
      ...theme.shadows.lg,
    },
    editTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
      textAlign: 'center',
    },
    editInput: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      fontSize: 16,
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
      marginBottom: theme.spacing.md,
    },
    editButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.spacing.md,
    },
    cancelButton: {
      flex: 1,
      padding: theme.spacing.md,
      marginRight: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
    },
    cancelButtonText: {
      color: theme.colors.textSecondary,
      fontSize: 16,
      fontWeight: '600',
    },
    saveButton: {
      flex: 1,
      padding: theme.spacing.md,
      marginLeft: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
    },
    saveButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    subtaskEditItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    removeSubtaskButton: {
      marginLeft: theme.spacing.sm,
      padding: theme.spacing.sm,
    },
    addSubtaskButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.md,
    },
    addSubtaskText: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: theme.spacing.sm,
    },
    editLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      marginTop: theme.spacing.md,
    },
  });

  // Use real subtasks from task data
  const subtasks = task.subtasks || [];
  const completedSubtasks = subtasks.filter(st => st.completed).length;
  const totalSubtasks = subtasks.length;

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale }],
          },
        ]}
      >
        <TouchableOpacity 
          onLongPress={() => setShowMenu(true)}
          activeOpacity={0.7}
        >
        {/* Header with checkbox, flag, title, and icons */}
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <TouchableOpacity style={styles.checkbox} onPress={handleToggle}>
              {task.completed && (
                <Ionicons name="checkmark" size={16} color={theme.colors.primary} />
              )}
            </TouchableOpacity>
            <View style={styles.flagIcon} />
          </View>
          <Text style={styles.taskTitle}>{task.title}</Text>
          {task.important && (
            <Ionicons 
              name="star" 
              size={16} 
              color="#FCD34D" 
              style={styles.starIcon}
            />
          )}
          <View style={styles.rightIcons}>
            <TouchableOpacity onPress={handleEdit}>
              <Ionicons 
                name="create-outline" 
                size={20} 
                color={theme.colors.primary} 
                style={styles.editIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleExpandToggle}>
              <Ionicons 
                name={isExpanded ? "chevron-up" : "chevron-down"} 
                size={16} 
                color={theme.colors.primary} 
                style={styles.chevronIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Completion status - only show when expanded */}
        {totalSubtasks > 0 && isExpanded && (
          <View style={styles.completionStatus}>
            <Text style={styles.completionText}>completed:</Text>
            <Text style={styles.completionCount}>
              {completedSubtasks}/{totalSubtasks}
            </Text>
          </View>
        )}

        {/* Subtasks - only show when expanded */}
        {totalSubtasks > 0 && isExpanded && (
          <View style={styles.subtasks}>
            {subtasks.map((subtask) => (
              <View key={subtask.id} style={styles.subtask}>
                <View style={styles.subtaskBullet} />
                <Text style={styles.subtaskText}>{subtask.text}</Text>
                <TouchableOpacity 
                  style={styles.subtaskCheckbox} 
                  onPress={() => handleSubtaskToggle(subtask.id)}
                >
                  {subtask.completed && (
                    <Ionicons name="checkmark" size={12} color="white" />
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        </TouchableOpacity>
      </Animated.View>

      {/* Menu Modal */}
      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity 
          style={styles.menuModal}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
              <Ionicons name="create-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.menuItemText}>Edit Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleEditSubtasks}>
              <Ionicons name="list-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.menuItemText}>Edit Steps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
              <Text style={[styles.menuItemText, styles.deleteText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Edit Modal */}
      <Modal
        visible={showEditModal}
        transparent
        animationType="slide"
        onRequestClose={handleCancelEdit}
      >
        <View style={styles.editModal}>
          <View style={styles.editContainer}>
            <Text style={styles.editTitle}>Edit Task</Text>
            
            <TextInput
              style={styles.editInput}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Task title"
              placeholderTextColor={theme.colors.textMuted}
            />
            
            <TextInput
              style={styles.editInput}
              value={editDescription}
              onChangeText={setEditDescription}
              placeholder="Description (optional)"
              placeholderTextColor={theme.colors.textMuted}
              multiline
            />
            
            <TextInput
              style={styles.editInput}
              value={editTime}
              onChangeText={setEditTime}
              placeholder="Time (optional)"
              placeholderTextColor={theme.colors.textMuted}
            />
            
            <Text style={styles.editLabel}>Steps (Optional)</Text>
            {editSubtasks.map((subtask, index) => (
              <View key={subtask.id} style={styles.subtaskEditItem}>
                <TextInput
                  style={[styles.editInput, { marginBottom: theme.spacing.sm }]}
                  value={subtask.text}
                  onChangeText={(text) => updateSubtaskText(subtask.id, text)}
                  placeholder={`Step ${index + 1}`}
                  placeholderTextColor={theme.colors.textMuted}
                />
                <TouchableOpacity 
                  style={styles.removeSubtaskButton}
                  onPress={() => removeSubtask(subtask.id)}
                >
                  <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity style={styles.addSubtaskButton} onPress={addSubtask}>
              <Ionicons name="add" size={20} color={theme.colors.primary} />
              <Text style={styles.addSubtaskText}>Add Step</Text>
            </TouchableOpacity>
            
            <View style={styles.editButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Subtask Edit Modal */}
      <Modal
        visible={showSubtaskEditModal}
        transparent
        animationType="slide"
        onRequestClose={handleCancelSubtaskEdit}
      >
        <View style={styles.editModal}>
          <View style={styles.editContainer}>
            <Text style={styles.editTitle}>Edit Steps</Text>
            
            {editSubtasks.map((subtask, index) => (
              <View key={subtask.id} style={styles.subtaskEditItem}>
                <TextInput
                  style={[styles.editInput, { marginBottom: theme.spacing.sm }]}
                  value={subtask.text}
                  onChangeText={(text) => updateSubtaskText(subtask.id, text)}
                  placeholder={`Step ${index + 1}`}
                  placeholderTextColor={theme.colors.textMuted}
                />
                <TouchableOpacity 
                  style={styles.removeSubtaskButton}
                  onPress={() => removeSubtask(subtask.id)}
                >
                  <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity style={styles.addSubtaskButton} onPress={addSubtask}>
              <Ionicons name="add" size={20} color={theme.colors.primary} />
              <Text style={styles.addSubtaskText}>Add Step</Text>
            </TouchableOpacity>
            
            <View style={styles.editButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelSubtaskEdit}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveSubtasks}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TaskItem;
