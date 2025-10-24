import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';

const CategoryFilter = () => {
  const { theme } = useTheme();
  const { currentFilter, setFilter } = useTasks();

  const categories = ['All', 'Work', 'Education', 'Personal', 'Sport'];

  const styles = StyleSheet.create({
    container: {
      marginBottom: theme.spacing.lg,
    },
    scrollView: {
      paddingHorizontal: theme.spacing.md,
    },
    categoryButton: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.xl,
      marginRight: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    activeCategoryButton: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    categoryText: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.textSecondary,
    },
    activeCategoryText: {
      color: 'white',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              currentFilter === category && styles.activeCategoryButton,
            ]}
            onPress={() => setFilter(category)}
          >
            <Text
              style={[
                styles.categoryText,
                currentFilter === category && styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryFilter;
